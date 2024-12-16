/* -------------------------------------------------------------------------- */
/*                                   UNUSED                                   */
/* -------------------------------------------------------------------------- */

const express = require("express");
const router = express.Router();
const { sequelize } = require("../models"); // Pour tester la DB Sequelize

// Endpoint principal
router.get("/health", async (req, res) => {
    try {
        // Vérifie si le serveur fonctionne
        const serverHealth = {
            status: "healthy",
            uptime: process.uptime(),
            timestamp: new Date(),
        };

        // Vérifie la connexion à la base de données
        let dbHealth = { status: "unhealthy" };
        try {
            await sequelize.authenticate();
            dbHealth = { status: "healthy" };
        } catch (err) {
            dbHealth = { status: "unhealthy", error: err.message };
        }

        // Réponse finale
        res.status(200).json({
            server: serverHealth,
            database: dbHealth,
        });
    } catch (error) {
        res.status(500).json({ message: "Health check failed", error: error.message });
    }
});

module.exports = router;
