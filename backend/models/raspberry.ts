import { DataTypes, Sequelize, ModelCtor, Model } from "sequelize";
import { T_Model } from "./";
let Raspberry: T_Model;

/**
 * @swagger
 * components:
 *   schemas:
 *     Raspberry:
 *       type: object
 *       required:
 *         - mac
 *         - lastUsed
 *       properties:
 *         mac:
 *           type: string
 *           description: The MAC address of the Raspberry
 *         lastUsed:
 *           type: string
 *           format: date-time
 *           description: The last used date of the Raspberry
 */
export const initModel = (sequelize: Sequelize) => {
    Raspberry = sequelize.define(
        "raspberry",
        {
            mac: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            sshKey: {
                type: DataTypes.STRING(600), // ~ pour une clé RSA 2048 bits
            },
            lastUsed: {
                type: DataTypes.DATE,
            },
        },
        { tableName: "raspberries" }
    );
};

export { Raspberry };
