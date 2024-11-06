const express = require('express');
const MacAdress = require('../models/macadress');

const router = express.Router();

// Route to get all macadresses
router.get('/macadresses', async (req, res) => {
    try {
        const macadresses = await MacAdress.find();
        res.json(macadresses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new macadress
router.put('/macadresses', async (req, res) => {
    const macadress = new MacAdress({
        adress: req.body.adress,
        id: await MacAdress.countDocuments() + 1 // Auto-increment ID
    });

    try {
        const newMacAdress = await macadress.save();
        res.status(201).json(newMacAdress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;