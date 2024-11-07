/**
 * @swagger
 * components:
 *   schemas:
 *     RaspberryPort:
 *       type: object
 *       required:
 *         - port
 *         - raspberryMac
 *         - serverPort
 *       properties:
 *         port:
 *           type: integer
 *           description: The port number
 *         raspberryMac:
 *           type: string
 *           description: The MAC address of the Raspberry
 *         serverPort:
 *           type: integer
 *           description: The server port number
 */
module.exports = (DataTypes, sequelize) =>
    sequelize.define(
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
