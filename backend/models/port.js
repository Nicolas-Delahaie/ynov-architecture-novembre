const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Définir le modèle Port
const Port = sequelize.define('Port', {
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
});

module.exports = Port;