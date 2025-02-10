

const express = require('express');

const aproposController = require ('../controllers/apropos'); // le chemin pour appelle pour trouver mon fichier apropos

const router = express.Router();

router.get('/apropos', aproposController.aproposView); // j'ai appele mais deux variable 



module.exports = router;