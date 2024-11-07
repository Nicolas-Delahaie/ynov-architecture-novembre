> Projet en équipe de 4  
> Débuté le 5 novembre en architecture logicielle

# Explications

Mise en place d'une architecture permettant la communication avec des Rapsberries via des APIs.

**Concrètement :**  
Plusieurs Raspberries communiquent à un serveur via reverse SSH.  
Le serveur doit pouvoir accéder aux services exposés sur les ports internes des Raspberries.  
Au démarrage, le Raspberry doit pouvoir lier chacun de ses ports en écoute à des ports uniques sur le serveur, fournis à la demande via API.  
L'authentification se fait uniquement sur chaque Raspberry.

# Utilisation

-   Dans backend/, executer `npm install`.

-   A la racine du projet, executer `docker compose up --build`.

-   Générer la structure de la db en appelant en POST /initdb

-   Dans le container, executer `npx sequelize-cli db:seed:all` (Si des donénes existent déjà, les supprimer avec `npx sequelize-cli db:seed:undo:all`)
