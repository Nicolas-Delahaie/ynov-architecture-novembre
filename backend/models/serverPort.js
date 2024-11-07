const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// Définir le modèle ServerPort
const ServerPort = sequelize.define(
    "serverPort",
    {
        port: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    { timestamps: false }
);

module.exports = ServerPort;
