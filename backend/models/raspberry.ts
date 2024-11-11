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
                allowNull: false,
                primaryKey: true,
            },
            lastUsed: {
                type: DataTypes.DATE,
            },
        },
        { tableName: "raspberries" }
    );
};

export { Raspberry };
