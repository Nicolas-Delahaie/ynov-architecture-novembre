import express, { Request } from "express";
import { RaspberryPort, ServerPort } from "../models";
const router = express.Router();

interface RegisterBody {
    mac?: string;
    raspberryPorts?: { type: string; port: number }[];
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
        const { mac, raspberryPorts } = req.body;

        // Checking props
        if (!mac) {
            res.status(400).json("Missing prop : mac");
            return;
        }

        if (!raspberryPorts) {
            res.status(400).json("Missing prop : raspberryPorts");
            return;
        }

        if (mac === "") {
            res.status(400).json("Bad prop : mac empty");
            return;
        }
        if (raspberryPorts.length === 0) {
            res.status(400).json("Bad prop : raspberryPorts empty");
            return;
        }

        // Checking if raspberryPorts already exists
        // ...

        // Creating raspberryPorts
        const createdRaspberryPorts = await RaspberryPort.bulkCreate(
            // Adding raspberryMac to each port
            raspberryPorts.map((port) => ({
                ...port,
                raspberryMac: mac,
            }))
        );

        // Creating server ports in dba
        const serverPorts = await ServerPort.bulkCreate(
            createdRaspberryPorts.map((raspberryPort) => ({
                raspberryPortId: raspberryPort.getDataValue("id"),
            }))
        );

        res.status(200).json(serverPorts.map((port) => port.toJSON()));
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
