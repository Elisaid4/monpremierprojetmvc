



const express = require('express');

const loginController = require ('../controllers/login'); // le chemin pour appelle pour trouver mon fichier apropos

const router = express.Router();

router.get('/login', loginController.loginView); // j'ai appele mais deux variable 



module.exports = router;