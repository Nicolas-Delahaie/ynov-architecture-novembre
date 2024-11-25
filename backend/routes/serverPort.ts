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
        // ...

        // Creating raspberryPorts
        const raspberryPorts = await RaspberryPort.bulkCreate(
            // Adding raspberryMac to each port
            raspberryPortsToCreate.map((port) => ({
                port,
                type: "http", // Retirer ou adapter le type
                raspberryMac: mac,
            }))
        );

        // Creating server ports in dba
        const serverPortsToCreate = raspberryPorts.map((raspberryPort) => ({
            raspberryPortId: raspberryPort.getDataValue("id") as number,
        }));
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
