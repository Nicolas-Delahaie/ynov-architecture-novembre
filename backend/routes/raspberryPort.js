const express = require('express');
const RaspberryPort = require('../models/raspberryPort');
const Raspberry = require('../models/raspberry');
const { Op } = require('sequelize');

const router = express.Router();

router.put('/raspberryPorts/cleanup', async (req, res) => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Trouver tous les Raspberry dont la date LastUsed est supérieure à 2 jours
        const obsoleteRaspberries = await Raspberry.findAll({
            where: {
                LastUsed: {
                    [Op.lt]: twoDaysAgo
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