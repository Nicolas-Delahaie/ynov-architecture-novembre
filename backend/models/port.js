const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const MacAddress = require('./macadress');

// Définir le modèle Port
const Port = sequelize.define('Port', {
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    macAddressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'ports' });

Port.belongsTo(MacAddress, {
    foreignKey: {
        name: 'macAddressId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = Port;