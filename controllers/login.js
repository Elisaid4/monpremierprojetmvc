

// controlleur
const bcrypt = require('bcrypt');
module.exports = {
    // Affiche la vue de connexion
    loginView: (req, res) => {
        res.render('login');
    },

    // Authentifie l'utilisateur
    loginUser: (req, res) => {
        const { email, password } = req.body;

        req.getConnection((err, connection) => {
            if (err) {
                console.error("Erreur de connexion à la base de données :", err);
                return res.status(500).send("Erreur serveur");
            }

            const sql = "SELECT * FROM utilisateur WHERE email = ?";
            connection.query(sql, [email], (err, results) => {
                if (err) {
                    console.error("Erreur lors de la requête SQL :", err);
                    return res.status(500).send("Erreur serveur");
                }

                if (results.length === 0) {
                    return res.status(401).send("Email ou mot de passe incorrect");
                }

                const user = results[0];

                bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
                    if (err) {
                        console.error("Erreur bcrypt :", err);
                        return res.status(500).send("Erreur serveur");
                    }

                    if (!isMatch) {
                        return res.status(401).send("Email ou mot de passe incorrect");
                    }

                    // Vérifie si req.session existe avant de l'utiliser
                    if (!req.session) {
                        return res.status(500).send("Erreur de session");
                    }

                    req.session.user = {
                        id: user.id,
                        nom: user.nom,
                        prenom: user.prenom,
                        email: user.email
                    };

                    res.redirect('/apropos');
                });
            });
        });
    }
};
   