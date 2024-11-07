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
module.exports = (DataTypes, sequelize) =>
    sequelize.define(
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
