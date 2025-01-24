> Projet en équipe de 4  
> Débuté le 5 novembre en architecture logicielle

Lien du Trello pour la répartition des tâches : https://trello.com/b/exeUFmex/architecture-logicielle  
Lien du Gitlab avec les schémas fonctionnels : https://gitlab.bzctoons.net/-/snippets/75

# Explications

Architecture logicielle permettant d'accéder à des Rapsberries d'un réseau local à distance via API.

**Concrètement :**  
Plusieurs Raspberries communiquent à un serveur via reverse SSH.  
Ce serveur doit pouvoir accéder aux ports internes des Raspberries pour utiliser les services exposés.  
Au démarrage, le Raspberry lie chacun de ses ports en écoute à des ports uniques sur le serveur, fournis à la demande via API.  
L'authentification se fait uniquement sur chaque Raspberry.

# Structure du Projet

## Backend

L'api est codée en javascript et typescript

### `config/`

Contient les fichiers de configuration du projet.

### `models/`

- **`index.ts`** : Point d'entrée pour regrouper et exporter les modèles.
- **`initializeRelations.ts`** : Définit les relations entre les modèles.
- **`raspberry.ts`** : Modèle représentant un Raspberry.
- **`raspberryPort.ts`** : Modèle gérant les ports associés aux Raspberry.
- **`serverPort.ts`** : Modèle pour gérer les ports du serveur.

### `routes/`

- **`initdb.js`** : Route pour initialiser la base de données.
- **`raspberry.js`** : Route pour les opérations liées aux Raspberry.
- **`raspberryPort.js`** : Route pour gérer les ports des Raspberry.
- **`serverPort.ts`** : Route pour les ports de serveur.

### `seeders/`

- Contient les scripts pour insérer des données initiales dans la base de données.

### `scripts/`

- **`register.sh`** : Script shell pour enregistrer ou configurer des dépendances ou services.

## Docker

### `docker/`

Contient les configurations Docker pour déployer l'application.

### `docker-compose.yaml`

Fichier pour orchestrer les conteneurs Docker.

## Docs

Contient la documentation liée au projet, tel que les diagrammes UML.

## Fichiers de base

- **`index.html`** : Page HTML de présentation (si applicable).
- **`package.json`** : Déclaration des dépendances Node.js.
- **`tsconfig.json`** : Configuration TypeScript.
- **`.env`** : Fichier pour les variables d'environnement.
- **`README.md`** : Documentation du projet.

# Pré-requis

- Node.js
- Docker Desktop (version qui inclue docker compose)

# Utilisation

- Dans backend/, executer `npm install`.

- A la racine du projet, executer `docker compose up --build -d`.

- Générer la structure de la db en appelant la route POST /api/initdb du service backend. Executer dans le container
