const { Sequelize } = require('sequelize');

// Créer une instance Sequelize
const sequelize = new Sequelize('mysql://root:root@localhost:3306/archi');

module.exports = sequelize;
