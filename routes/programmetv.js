



const express = require('express');

const programmetvController = require ('../controllers/programmetv'); // le chemin pour appelle pour trouver mon fichier apropos

const router = express.Router();

router.get('/programmetv', programmetvController.programmetvView); // j'ai appele mais deux variable 



module.exports = router;