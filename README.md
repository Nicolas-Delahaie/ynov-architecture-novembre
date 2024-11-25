> Projet en équipe de 4  
> Débuté le 5 novembre en architecture logicielle

# Explications

Architecture logicielle permettant d'accéder à des Rapsberries d'un réseau local à distance via API.

**Concrètement :**  
Plusieurs Raspberries communiquent à un serveur via reverse SSH.  
Ce serveur doit pouvoir accéder aux ports internes des Raspberries pour utiliser les services exposés.  
Au démarrage, le Raspberry lie chacun de ses ports en écoute à des ports uniques sur le serveur, fournis à la demande via API.  
L'authentification se fait uniquement sur chaque Raspberry.

# Utilisation

-   Dans backend/, executer `npm install`.

-   A la racine du projet, executer `docker compose up --build -d`.

-   Générer la structure de la db en appelant /initdb en POST

-   Dans le container, executer `npx sequelize-cli db:seed:all` (Si des données existent déjà, les supprimer avec `npx sequelize-cli db:seed:undo:all`)
