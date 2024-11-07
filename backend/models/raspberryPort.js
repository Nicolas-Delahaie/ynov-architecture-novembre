const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Définir le modèle RaspberryPort
const RaspberryPort = sequelize.define('RaspberryPort', {
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
}, { tableName: 'RaspberryPort' });


module.exports = RaspberryPort;