const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Raspberry = require('./raspberry');

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
}, { tableName: 'RaspberryPort' });


module.exports = RaspberryPort;