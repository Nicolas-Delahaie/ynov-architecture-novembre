import express from "express";
const { sequelize, RaspberryPort, Raspberry, ServerPort } = require("../models");
const router = express.Router();

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
router.post("/register", async (req, res) => {
    try {
        // const unusedPorts = await ServerPort.findAll({
        //     where: {
        //         foreignKeyId: {
        //             [Op.ne]: null, // Sequelize.Op.ne signifie "not equal" (pas égal à)
        //         },
        //     },
        // });
        // Get not used created ports

        // If not enough, create more

        // Assign each server port with each raspberry port

        res.status(201).json(1);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
