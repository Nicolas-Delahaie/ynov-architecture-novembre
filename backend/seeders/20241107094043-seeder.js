"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            // Generate 10 raspberries
            let raspberries = [];
            for (let i = 0; i < 10; i++) {
                raspberries.push({
                    mac: "abcdefghijk".slice(0, i + 1),
                    sshKey: "sshPublicKeyXXXXXXXXXXX",
                    lastUsed: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            await queryInterface.bulkInsert("raspberries", raspberries);

            // Every raspberry has 2 to 5 server port
            const raspberryPorts = [];
            let index = 1;
            const minPorts = 2;
            const maxPorts = 5;
            const internalPorts = [80, 220, 919, 2910, 8471];
            for (const rasp of raspberries) {
                const portsNumber = Math.floor(Math.random() * (maxPorts - minPorts + 1)) + minPorts;

                // Assign portsNumber of raspberry to server ports availables
                for (let i = 0; i < portsNumber; i++) {
                    raspberryPorts.push({
                        id: index,
                        port: internalPorts[i],
                        type: Math.round(Math.random()) === 0 ? "http" : "tcp",
                        raspberryMac: rasp.mac,
                    });
                    index++;
                }
            }
            await queryInterface.bulkInsert("raspberryPorts", raspberryPorts);

            // Every raspberry port has a server port
            const FIRST_PORT = 10000;
            const serverPorts = [];
            for (let i = 0; i < raspberryPorts.length; i++) {
                serverPorts.push({ port: FIRST_PORT + i, raspberryPortId: raspberryPorts[i].id });
            }
            await queryInterface.bulkInsert("serverPorts", serverPorts);
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
        await queryInterface.bulkDelete("serverPorts");
        await queryInterface.bulkDelete("raspberryPorts");
        await queryInterface.bulkDelete("raspberries");
    },
};
