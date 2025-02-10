

UPDATE videos SET titre = 'video de chigoma ', legende = 'le chigoma et un chant et une danse  ancestrale traditionnel a mayotte depuis 1299' WHERE nom_video = 'chigoma';


UPDATE videos SET lien_video = "https://www.youtube.com/watch?v=cThcPkc8b4c" WHERE nom_video = "Chigoma";




CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_naissance DATE
   
);



INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, date_naissance) VALUES
('Elza', 'Marie', 'elza.marie@example.com', 'hashed_password1', '1995-06-15'),
('Mina', 'Leroy', 'mina.said@example.com', 'hashed_password2', '1998-09-22'),
('Saandane', 'Mc', 'saandane.mc@example.com', 'hashed_password3', '1992-03-10'),
('Anti', 'Daday', 'anti.daday@example.com', 'hashed_password4', '2000-12-05');
