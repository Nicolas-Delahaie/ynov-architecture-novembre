const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const RaspberryPort = require('./raspberryPort');

// Définir le modèle ServerPort
const ServerPort = sequelize.define('ServerPort', {
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    raspberryPort: {
        type: DataTypes.INTEGER,
        references: {
            model: RaspberryPort,
            key: 'port'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
}, { tableName: 'ServerPorts' });


module.exports = ServerPort;