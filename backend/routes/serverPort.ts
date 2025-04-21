import express, { Request } from "express";
import { Raspberry, RaspberryPort, ServerPort } from "../models";
import sequelize from "sequelize";
const router = express.Router();

interface RegisterBody {
    mac?: string;
    raspberryPorts?: string;
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

        // Checking props
        if (!mac) {
            res.status(400).json("Missing prop : mac");
            return;
        }
        if (!raspberryPortsToCreate) {
            res.status(400).json("Missing prop : raspberryPorts");
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

        // Creating raspberry
        Raspberry.findOrCreate({
            where: { mac },
            defaults: { sshKey: "coucou", lastUsed: new Date(), createdAt: new Date(), updatedAt: new Date() },
        });

        // Checking if raspberryPorts already exists
        const existingRaspberryPorts = (
            await RaspberryPort.findAll({
                where: {
                    raspberryMac: mac,
                    port: {
                        [sequelize.Op.in]: raspberryPortsToCreate,
                    },
                },
            })
        ).map((port) => port.dataValues);

        console.log("Existing raspberry ports : ", existingRaspberryPorts);

        // Removing existing existing ports from raspberryPortsToCreate
        raspberryPortsToCreate.filter((portToCreate) => {
            // const alreadyExists = existingRaspberryPorts.find((existingPort) => existingPort.port === portToCreate);
            // console.log("Finding port to create " + portToCreate + (alreadyExists ? " found" : " not found"));
            // return alreadyExists !== undefined;
        });

        console.log("Final raspberries to create" + raspberryPortsToCreate);

        // Creating raspberryPorts
        const createdRaspberryPorts = (
            await RaspberryPort.bulkCreate(
                // Adding raspberryMac to each port
                raspberryPortsToCreate.map((port) => {
                    const cleanedPort = port.replace(":", "");
                    return {
                        port: cleanedPort,
                        type: cleanedPort === port ? "HTTP" : "TCP",
                        raspberryMac: mac,
                    };
                })
            )
        ).map((port) => port.dataValues);

        const raspberryPorts = [...existingRaspberryPorts, ...createdRaspberryPorts];

        // Creating server ports in dba
        const serverPortsToCreate = createdRaspberryPorts.map((raspberryPort) => ({
            raspberryPortId: raspberryPort.id,
        }));
        const serverPorts = (await ServerPort.bulkCreate(serverPortsToCreate)).map((port) => port.dataValues);

        // Sort resulting serverPorts to match initial asked order
        // TODO

        // Result
        res.status(200).json(serverPorts.map((port) => port.port));
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
