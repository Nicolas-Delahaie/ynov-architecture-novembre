const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("archi", "root", "root", {
    host: "mysql",
    dialect: "mysql",
});

const Raspberry = require("./raspberry")(DataTypes, sequelize);
const RaspberryPort = require("./raspberryPort")(DataTypes, sequelize);
const ServerPort = require("./serverPort")(DataTypes, sequelize);

module.exports = {
    sequelize,
    Raspberry,
    RaspberryPort,
    ServerPort,
};
