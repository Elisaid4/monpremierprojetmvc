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

                return res.render('apropos', { equipe: rows });
            });
        });
    }
};
