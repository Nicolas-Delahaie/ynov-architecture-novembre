import { DataTypes, Sequelize, ModelCtor, Model } from "sequelize";
import { T_Model } from "./";
let RaspberryPort: T_Model;

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

export const initModel = (sequelize: Sequelize) => {
    RaspberryPort = sequelize.define(
        "raspberryPort",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            port: {
                type: DataTypes.INTEGER,
            },
        },
        { timestamps: false }
    );
};

export { RaspberryPort };
