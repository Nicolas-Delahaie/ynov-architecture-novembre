const express = require('express');
const Port = require('../models/port');

const router = express.Router();

// Route to get all ports
router.get('/ports', async (req, res) => {
    try {
        const ports = await Port.find();
        res.json(ports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new port
router.put('/ports', async (req, res) => {
    const { port, macAddressId } = req.body;

    try {
        const newPort = await Port.create({ port, macAddressId });
        res.status(201).json(newPort);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;