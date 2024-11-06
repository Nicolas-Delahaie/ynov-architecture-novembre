const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('archi', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
