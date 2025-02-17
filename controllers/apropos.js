module.exports = {
    aproposView: (req, res) => {
        req.getConnection((err, connection) => {
            if (err) {
                console.error('Erreur de connexion à la base de données:', err);
                return res.status(500).json({ error: 'Erreur serveur lors de la connexion à la base de données' });
            }

            connection.query('SELECT * FROM equipe', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de la récupération des données:', err);
                    return res.status(500).json({ error: 'Erreur serveur lors de la récupération des données' });
                }

                console.log("Utilisateur connecté :", req.session.user); // DEBUG

                return res.render('apropos', { 
                    user: req.session.user || null, // Assure que user est défini
                    equipe: rows 
                });
            });
        });
    }
};
