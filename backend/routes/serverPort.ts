import express, { Request } from "express";
import { Raspberry, RaspberryPort, ServerPort } from "../models";
import fs from "fs";
const router = express.Router();

interface RegisterBody {
    mac?: string;
    raspberryPorts?: string;
    sshKey?: string;
}

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new server port
 *     tags: [ServerPort]
 *     responses:
 *       201:
 *         description: Server port registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", async (req: Request<{}, {}, RegisterBody>, res) => {
    try {
        const body = req.body;

        const mac = body?.mac;
        const raspberryPortsToCreate = body.raspberryPorts?.split(",");
        const sshKey = body?.sshKey;

        // Checking props
        if (!mac) {
            res.status(400).json("Missing prop : mac");
            return;
        }
        if (!raspberryPortsToCreate) {
            res.status(400).json("Missing prop : raspberryPorts");
            return;
        }
        if (!sshKey) {
            res.status(400).json("Missing prop : sshKey");
            return;
        }
        if (mac === "") {
            res.status(400).json("Bad prop : mac empty");
            return;
        }
        if (raspberryPortsToCreate.length === 0) {
            res.status(400).json("Bad prop : raspberryPorts empty");
            return;
        }
        if (sshKey === "") {
            res.status(400).json("Bad prop : sshKey empty");
            return;
        }

        // Creating raspberry
        await Raspberry.findOrCreate({
            where: { mac },
            defaults: { sshKey, lastUsed: new Date(), createdAt: new Date(), updatedAt: new Date() },
        });

        const sshKeys = await Raspberry.findAll({
            attributes: ["sshKey"],
        });

        const newKeys = sshKeys.map((rasp: unknown) => (rasp as any).sshKey).join("\n");
        fs.writeFileSync("/root/.ssh/authorized_keys", newKeys);

        // Checking if raspberryPorts already exist
        // TODO

        // Creating raspberryPorts
        const raspberryPorts = await RaspberryPort.bulkCreate(
            // Adding raspberryMac to each port
            raspberryPortsToCreate.map((port) => {
                const cleanedPort = port.replace(":", "");
                return {
                    port: cleanedPort,
                    type: cleanedPort === port ? "HTTP" : "TCP",
                    raspberryMac: mac,
                };
            })
        );

        // Creating server ports in dba
        let currentPort: number = (await ServerPort.max("port")) || 9999;
        const serverPortsToCreate = await Promise.all(
            raspberryPorts.map(async (raspberryPort) => {
                currentPort++;
                return {
                    raspberryPortId: raspberryPort.getDataValue("id") as number,
                    port: currentPort,
                };
            })
        );

        const serverPorts = (await ServerPort.bulkCreate(serverPortsToCreate)).map(
            (serverPort) => serverPort.getDataValue("port") as string
        );

        // Result
        res.status(200).send(serverPorts.join(","));
    } catch (error) {
        res.status(400).json({
            error: {
                name: (error as any).name,
                message: (error as any).message,
                stack: (error as any).stack,
                errors: (error as any).errors?.map((err: any) => {
                    return `Propriété : ${err.path}, Erreur : ${err.message}`;
                }),
            },
        });
    }
});

router.get("/traefikconfig", async (req, res) => {
  try {
    // let config = {
    //     http: {
    //         routers: {
    //             backend: {
    //                 rule: "Host(`api.local`)",
    //                 service: "backend",
    //                 entryPoints: "websecure",
    //                 tls: true,
    //             },
    //             api: {
    //                 rule: "PathPrefix(`/dashboard`)",
    //                 service: "api@internal",
    //                 entryPoints: "dashboard",
    //             },
    //         },
    //         services: {
    //             backend: {
    //                 loadBalancer: {
    //                     servers: [
    //                         {
    //                             url: "http://backend:80",
    //                         },
    //                     ],
    //                 },
    //             },
    //             raspberries: {
    //                 loadBalencer: {
    //                     servers: [
    //                         {
    //                             url: "http://backend:10000",
    //                         },
    //                         {
    //                             url: "http://backend:10001",
    //                         },
    //                         {
    //                             url: "http://backend:10002",
    //                         },
    //                         {
    //                             url: "http://backend:10003",
    //                         },
    //                     ],
    //                 },
    //             },
    //         },
    //     },
    //     entryPoints: {
    //         web: {
    //             address: ":80",
    //         },
    //         websecure: {
    //             address: ":443",
    //         },
    //     },
    //     api: {
    //         dashboard: true,
    //     },
    // };
    // res.status(200).send(YAMLStringify(config, { indent: 4 }));

    let config = fs.readFileSync("/app/traefik/traefik.yaml", "utf8");

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(config);
  } catch (error) {
    res.status(400).json({
      error: {
        name: (error as any).name,
        message: (error as any).message,
        stack: (error as any).stack,
        errors: (error as any).errors?.map((err: any) => {
          return `Propriété : ${err.path}, Erreur : ${err.message}`;
        }),
      },
    });
  }
});

/**
 * @swagger
 * /ports:
 *   get:
 *     summary: Get all server ports
 *     tags: [ServerPort]
 *     responses:
 *       200:
 *         description: The list of all server ports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServerPort'
 *       500:
 *         description: Internal server error
 */
router.get("/ports", async (req, res) => {
    try {
        const ports = await ServerPort.findAll();
        res.json(ports);
    } catch (err) {
        res.status(500).json({ message: (err as any).message });
    }
});

module.exports = router;
