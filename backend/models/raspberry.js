const { DataTypes } = require('sequelize');
const sequelize = require('../database');

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
const Raspberry = sequelize.define('raspberry', {
    mac: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    lastUsed: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, { tableName: 'raspberries' });

module.exports = Raspberry;