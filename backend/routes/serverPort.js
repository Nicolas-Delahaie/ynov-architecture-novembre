const express = require('express');
const ServerPort = require('../models/serverPort');

const router = express.Router();

// Route to get all ports from server
router.get('/ports', async (req, res) => {
    try {
        const ports = await ServerPort.findAll();
        res.json(ports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;