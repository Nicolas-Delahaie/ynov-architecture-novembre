const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('archi', 'root', 'root', {
    host: 'mysql',
    dialect: 'mysql',
});

module.exports = sequelize; 
