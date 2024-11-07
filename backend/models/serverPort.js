const { DataTypes } = require("sequelize");
const sequelize = require("../database");

/**
 * @swagger
 * components:
 *   schemas:
 *     ServerPort:
 *       type: object
 *       required:
 *         - port
 *       properties:
 *         port:
 *           type: integer
 *           description: The port number
 */
const ServerPort = sequelize.define(
    "serverPort",
    {
        port: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    { timestamps: false }
);

module.exports = ServerPort;
