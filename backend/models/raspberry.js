const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Raspberry = sequelize.define('raspberry', {
    mac: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    lastUsed: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, { tableName: 'raspberries' });

module.exports = Raspberry;