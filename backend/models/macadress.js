const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Définir le modèle MacAdresse
const MacAdresse = sequelize.define('MacAdresse', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { tableName: 'macadresses' });

module.exports = MacAdresse;