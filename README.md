# Projet 7 - Créez un réseau social d’entreprise

## Backend
### Préparation

Créé un fichier .env dans le dossier backend avec :
```
// Connection à la base de donnée MySql
MYSQL_DATABASE = // nom de la base de donnée
MYSQL_LOGIN = // login de connection à la base de donnée
MYSQL_PASSWORD = // mot de passe de connection à la base de donnée
MYSQL_HOST = localhost //adresse du serveur Mysql

// Reglage serveur - port du backend
PORT = 4200 

//Securiter - clef de génération du token utilisateur
TOKEN = RANDOM_SECRET_TOKEN
```
### Lancement 

Lancer le backend avec la commande "npm start"

## Frontend
### Préparation

Créé un fichier .env dans le dossier frontend avec :
```
// Adresse du serveur de l'Api
REACT_APP_API_URL= http://localhost:4200

// port du frontend
PORT= 3000
```
### Lancement 

Lancer le frontend avec la commande "npm start"