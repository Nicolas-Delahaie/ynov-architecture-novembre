"use strict";

const Raspberry = require("../models/raspberry");
const RaspberryPort = require("../models/raspberryPort");
const ServerPort = require("../models/serverPort");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            let raspberries = [];
            for (let i = 0; i < 10; i++) {
                raspberries.push({
                    mac: "abcdefghijk".slice(0, i + 1),
                    lastUsed: new Date(),
                    createdAt: new Date(), // Définit manuellement createdAt avec la date actuelle
                    updatedAt: new Date(),
                });
            }

            const FIRST_PORT = 10000;
            const SERVER_PORTS_NUMBER = 100;
            const serverPorts = [];
            for (let i = 0; i < SERVER_PORTS_NUMBER; i++) {
                serverPorts.push({ port: FIRST_PORT + i });
            }

            const raspberryPorts = [];
            let serverPortAvailable = FIRST_PORT;
            for (const rasp of raspberries) {
                const min = 2;
                const max = 5;
                const portsNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                const internalPorts = [80, 220, 919, 2910, 8471];
                // Assign portsNumber of raspberry to server ports availables
                for (let i = 0; i < portsNumber; i++) {
                    const internalPort = internalPorts[i];
                    raspberryPorts.push({
                        port: internalPort,
                        raspberryMac: rasp.mac,
                        serverPort: serverPortAvailable,
                    });
                    serverPortAvailable += 1;
                }
            }

            await queryInterface.bulkInsert("raspberries", raspberries);
            await queryInterface.bulkInsert("serverPorts", serverPorts);
            await queryInterface.bulkInsert("raspberryPorts", raspberryPorts);
        } catch (error) {
            console.error({
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    errors: error.errors?.map((err) => {
                        return `Propriété : ${err.path}, Erreur : ${err.message}`;
                    }),
                },
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await Raspberry.destroy({ where: {} });
        await ServerPort.destroy({ where: {} });
        await RaspberryPort.destroy({ where: {} });
    },
};
