

module.exports = {
    // Module qui contient la vue avec deux paramètres
    videoView: (req, res) => {
        req.getConnection((err, connection) => {
            if (err) {
                console.error('Erreur de connexion à la base de données :', err);
                return res.status(500).send('Erreur serveur');
            }
    
            connection.query('SELECT id, nom_video, titre, legende, lien_video FROM videos', (err, rows) => {
                if (err) {
                    console.error('Erreur lors de la récupération des vidéos :', err);
                    return res.status(500).send('Erreur serveur');
                }
    
                console.log("Données récupérées :", rows);
                res.render('video', { videos: rows });
            });
        });
    }
};




//<header>
   //     <%- include('navbar') %> <!-- Inclusion de la barre de navigation -->
      //  <h1>À propos</h1>
        
    //</header>

    //<main>
      //  <h2>Notre équipe</h2>
       // <ul>
         //   <% equipe.forEach(membre => { %>
             //   <li><%= membre.nom %> - <%= membre.role %></li>
           // <% }); %>
       // </ul>
  //  </main>
//</body>
//</html>