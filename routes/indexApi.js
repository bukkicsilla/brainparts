var express = require('express');
var router = express.Router();
var brainparts = require('../controllers/brainApi');

router.get('/brainparts', brainparts.allParts);
router.get('/brainparts/:brainpartid', brainparts.showPart);
router.post('/brainparts', brainparts.createPart);
router.delete('/brainparts/:brainpartid', brainparts.deletePart);

module.exports = router;