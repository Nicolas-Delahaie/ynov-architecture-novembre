import { DataTypes, Sequelize, ModelCtor, Model } from "sequelize";
import { T_Model } from "./";
let ServerPort: T_Model;

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

export const initModel = (sequelize: Sequelize) => {
    ServerPort = sequelize.define(
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
};

export { ServerPort };
