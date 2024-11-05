const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Définir le modèle MacAdresse
const MacAdresse = sequelize.define('MacAdresse', {
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = MacAdresse;