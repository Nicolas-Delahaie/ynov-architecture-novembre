const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

/**
 * @swagger
 * /initdb:
 *   post:
 *     summary: Initialize the database
 *     tags: [InitDB]
 *     responses:
 *       200:
 *         description: Database is synchronizing in background
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Database is synchronizing in background (follow steps in the container console)
 *       500:
 *         description: Internal server error
 */
router.post("/initdb", (req, res) => {
    initdb();
    res.status(200).json("Database is synchronizing in background (follow steps in the container console)");

    async function initdb() {
        try {
            sequelize.sync({
                alter: true,
            });
            console.log("Database & tables created!");
        } catch (error) {
            console.error({
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    errors: error.errors?.map((err) => {
                        return `Propriété : ${err.path}, Erreur : ${err.message}`;
                    }),
                },
            });
        }
    }
});

module.exports = router;
