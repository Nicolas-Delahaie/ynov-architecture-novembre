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
            allowNull: false,
            primaryKey: true,
        },
    },
    { timestamps: false }
);

module.exports = ServerPort;
