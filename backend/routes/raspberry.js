const express = require("express");
const Raspberry = require("../models/raspberry");
const router = express.Router();

/**
 * @swagger
 * /raspberry:
 *   get:
 *     summary: Get all Raspberries
 *     tags: [Raspberry]
 *     responses:
 *       200:
 *         description: The list of all Raspberries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Raspberry'
 *       500:
 *         description: Internal server error
 */
router.get("/raspberry", async (req, res) => {
    try {
        const raspberry = await Raspberry.findAll();
        res.json(raspberry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /raspberry/{mac}:
 *   get:
 *     summary: Get Raspberry by MAC address
 *     tags: [Raspberry]
 *     parameters:
 *       - in: path
 *         name: mac
 *         schema:
 *           type: string
 *         required: true
 *         description: The MAC address of the Raspberry
 *     responses:
 *       200:
 *         description: The Raspberry with the specified MAC address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Raspberry'
 *       404:
 *         description: Raspberry not found
 *       500:
 *         description: Internal server error
 */
router.get("/raspberry/:mac", async (req, res) => {
    try {
        const raspberry = await Raspberry.findByPk(req.params.mac);
        res.json(raspberry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;