const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Raspberry = require("./raspberry");
const ServerPort = require("./serverPort");

// Définir le modèle RaspberryPort
const RaspberryPort = sequelize.define(
    "raspberryPort",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        raspberryMac: {
            type: DataTypes.STRING,
            references: {
                model: Raspberry,
                key: "mac",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        serverPort: {
            type: DataTypes.INTEGER,
            references: {
                model: ServerPort,
                key: "port",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    { timestamps: false }
);

module.exports = RaspberryPort;
