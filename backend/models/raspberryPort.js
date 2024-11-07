const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Raspberry = require('./raspberry');
const ServerPort = require('./serverPort');

// Définir le modèle RaspberryPort
const RaspberryPort = sequelize.define('RaspberryPort', {
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    raspberryMac: {
        type: DataTypes.STRING,
        references: {
            model: Raspberry,
            key: 'mac'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    serverPort: {
        type: DataTypes.INTEGER,
        references: {
            model: ServerPort,
            key: 'port'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, { tableName: 'RaspberryPort' });


module.exports = RaspberryPort;