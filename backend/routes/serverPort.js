const express = require("express");
const ServerPort = require("../models/serverPort");
// const { Op } = require("sequelize");
const router = express.Router();

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

router.get("/ports", async (req, res) => {
    try {
        const ports = await ServerPort.findAll();
        res.json(ports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
