







const express = require('express');

const singupController = require ('../controllers/singup'); // le chemin pour appelle pour trouver mon fichier apropos

const router = express.Router();

router.get('/singup', singupController.singupView); // j'ai appele mais deux variable 



module.exports = router;