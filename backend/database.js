const { Sequelize } = require('sequelize');

// Créer une instance Sequelize
const sequelize = new Sequelize('votre_base_de_donnees', 'votre_utilisateur', 'votre_mot_de_passe', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
