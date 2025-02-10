module.exports = {
    // Contrôleur pour afficher la vue des programmes TV
    programmetvView: (req, res) => { 
        req.getConnection((err, connection) => {
            if (err) {
                console.error('Erreur de connexion à la base de données:', err);
                return res.status(500).json({ error: 'Erreur serveur lors de la connexion à la base de données' });
            }

            // Exécute une requête SQL pour récupérer tous les programmes de diffusion
            connection.query('SELECT * FROM programmediffusion', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l’exécution de la requête SQL:', err);
                    return res.status(500).json({ error: 'Erreur serveur lors de la récupération des données' });
                }

                // Rend la vue 'programmetv.ejs' en passant les données des programmes
                return res.render('programmetv', { programme: rows });
            });
        });
    }
};
