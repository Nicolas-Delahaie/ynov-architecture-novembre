const express = require('express');
const { RaspberryPort, Raspberry } = require("../models");
const { Op } = require('sequelize');

const router = express.Router();

/**
 * @swagger
 * /raspberryPorts:
 *   get:
 *     summary: Get all RaspberryPorts
 *     tags: [RaspberryPort]
 *     responses:
 *       200:
 *         description: The list of all RaspberryPorts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RaspberryPort'
 *       500:
 *         description: Internal server error
 */
router.get('/raspberryPorts', async (req, res) => {
    try {
        const raspberryPorts = await RaspberryPort.findAll();
        res.json(raspberryPorts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /raspberryPorts/{mac}:
 *   get:
 *     summary: Get RaspberryPorts by MAC address
 *     tags: [RaspberryPort]
 *     parameters:
 *       - in: path
 *         name: mac
 *         schema:
 *           type: string
 *         required: true
 *         description: The MAC address of the Raspberry
 *     responses:
 *       200:
 *         description: The list of RaspberryPorts for the specified MAC address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RaspberryPort'
 *       500:
 *         description: Internal server error
 */
router.get('/raspberryPorts/:mac', async (req, res) => {
    try {
        const raspberryPorts = await RaspberryPort.findAll({
            where: {
                raspberryMac: req.params.mac
            }
        });
        res.json(raspberryPorts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /raspberryPorts/cleanup/{days}:
 *   put:
 *     summary: Clean serverPort references in RaspberryPort
 *     tags: [RaspberryPort]
 *     parameters:
 *       - in: path
 *         name: days
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number of days to check for obsolete entries
 *     responses:
 *       200:
 *         description: Obsolete serverPort references set to NULL successfully
 *       400:
 *         description: Invalid number of days
 *       500:
 *         description: Internal server error
 */
router.put('/raspberryPorts/cleanup/:days', async (req, res) => {
    try {
        const days = parseInt(req.params.days);
        if (isNaN(days) || days < 0) {
            return res.status(400).json({ message: 'Invalid days parameter' });
        }

        const dateClean = new Date();
        dateClean.setDate(dateClean.getDate() - days);

        // Trouver tous les Raspberry dont la date lastUsed est supérieure à 2 jours
        const obsoleteRaspberries = await Raspberry.findAll({
            where: {
                lastUsed: {
                    [Op.lt]: dateClean
                }
            }
        });

        // Extraire les adresses MAC des Raspberry obsolètes
        const obsoleteMacs = obsoleteRaspberries.map(raspberry => raspberry.mac);

        // Mettre à jour les références serverPort à NULL dans la table RaspberryPort
        await RaspberryPort.update(
            { serverPort: null },
            {
                where: {
                    raspberryMac: {
                        [Op.in]: obsoleteMacs
                    }
                }
            }
        );

        res.status(200).json({ message: 'Obsolete serverPort references set to NULL successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;