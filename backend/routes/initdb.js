const express = require("express");
const sequelize = require("./../database");

const router = express.Router();

// Route to get all RaspberryPorts
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
