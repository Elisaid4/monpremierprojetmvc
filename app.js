

// server.js
const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const myConnection = require('express-myconnection');

// Configuration de la base de données
const optionConnection = {
    host: 'localhost',
    user: 'root',
    password: 'Melinecarlose@2',
    database: 'chainetv',
    port: 3306
};

// Middleware pour utiliser la connexion MySQL
app.use(myConnection(mysql2, optionConnection, 'pool'));
app.use(express.urlencoded({ extended: false }));

// Configurer le moteur de vues EJS
app.set('view engine', 'ejs');
// Définir le dossier des vues
app.set("views", "./views");

// Middleware pour les fichiers statiques
app.use(express.static('public'));

// Route pour afficher les membres de l'équipe
app.get('/apropos', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        connection.query('SELECT * FROM equipe', (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur serveur');
            }
            res.render('apropos', { equipe: rows });
        });
    });
});

// Route pour afficher les programmes TV
app.get('/programmetv', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        connection.query('SELECT * FROM programmediffusion', (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur serveur');
            }
            res.render('programmetv', { programme: rows });
        });
    });
});



module.exports = app;