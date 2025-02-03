// server.js

// Importe le module Express pour créer le serveur
const express = require('express');

// Crée une instance de l'application Express
const app = express();

// Importe le module mysql2 pour interagir avec une base de données MySQL
const mysql2 = require('mysql2');

// Importe le module express-myconnection pour gérer les connexions MySQL dans Express
const myConnection = require('express-myconnection');

// Configuration de la base de données
const optionConnection = {
    host: 'localhost',       // Hôte de la base de données (local)
    user: 'root',            // Nom d'utilisateur de la base de données
    password: 'Melinecarlose@2', // Mot de passe de la base de données
    database: 'chainetv',    // Nom de la base de données
    port: 3306               // Port de la base de données (par défaut pour MySQL)
};

// Middleware pour utiliser la connexion MySQL avec un pool de connexions
app.use(myConnection(mysql2, optionConnection, 'pool'));

// Middleware pour parser les données des requêtes HTTP en format URL-encoded
app.use(express.urlencoded({ extended: false }));

// Configurer le moteur de vues EJS pour générer des vues HTML
app.set('view engine', 'ejs');

// Définir le dossier des vues (où se trouvent les fichiers .ejs)
app.set("views", "./views");

// Middleware pour servir des fichiers statiques (comme CSS, JS, images) depuis le dossier 'public'
app.use(express.static('public'));

// Route pour afficher les membres de l'équipe
app.get('/apropos', (req, res) => {
    // Obtient une connexion à la base de données
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err); // Log l'erreur si la connexion échoue
            return res.status(500).send('Erreur serveur'); // Renvoie une erreur 500 au client
        }
        // Exécute une requête SQL pour sélectionner tous les membres de l'équipe
        connection.query('SELECT * FROM equipe', (err, rows) => {
            if (err) {
                console.error(err); // Log l'erreur si la requête échoue
                return res.status(500).send('Erreur serveur'); // Renvoie une erreur 500 au client
            }
            // Rend la vue 'apropos.ejs' en passant les données de l'équipe
            res.render('apropos', { equipe: rows });
        });
    });
});

// Route pour afficher la page vidéo
app.get('/video', (req, res) => {
    // Obtient une connexion à la base de données
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            return res.status(500).send('Erreur serveur');
        }

        // Exécute une requête SQL pour récupérer les vidéos
        connection.query('SELECT titre, legende, lien_video FROM videos', (err, rows) => {
            if (err) {
                console.error('Erreur lors de la récupération des vidéos :', err);
                return res.status(500).send('Erreur serveur');
            }

            console.log("Données récupérées :", rows); // Debug : vérifier les données

            // Rend la vue 'video.ejs' en passant les vidéos récupérées
            res.render('video', { videos: rows });
        });
    });
});



// Route pour afficher les programmes TV
app.get('/programmetv', (req, res) => {
    // Obtient une connexion à la base de données
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err); // Log l'erreur si la connexion échoue
            return res.status(500).send('Erreur serveur'); // Renvoie une erreur 500 au client
        }
        // Exécute une requête SQL pour sélectionner tous les programmes de diffusion
        connection.query('SELECT * FROM programmediffusion', (err, rows) => {
            if (err) {
                console.error(err); // Log l'erreur si la requête échoue
                return res.status(500).send('Erreur serveur'); // Renvoie une erreur 500 au client
            }
            // Rend la vue 'programmetv.ejs' en passant les données des programmes
            res.render('programmetv', { programme: rows });
        });
    });
});

// Exporte l'application Express pour pouvoir l'utiliser ailleurs (par exemple, dans les tests)
module.exports = app;