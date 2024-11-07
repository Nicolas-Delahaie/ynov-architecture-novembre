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
module.exports = (DataTypes, sequelize) =>
    sequelize.define(
        "raspberry",
        {
            mac: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            lastUsed: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        { tableName: "raspberries" }
    );
