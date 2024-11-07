const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Raspberry = sequelize.define('Raspberry', {
    mac: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    LastUsed: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, { tableName: 'Raspberry' });

module.exports = Raspberry;