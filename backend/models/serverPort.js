const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Définir le modèle ServerPort
const ServerPort = sequelize.define('ServerPort', {
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, { tableName: 'ServerPorts' });


module.exports = ServerPort;