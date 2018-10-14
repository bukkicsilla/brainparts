var express = require('express');
var router = express.Router();
var brainController = require('../controllers/brain');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parts of the Human Brain' });
});*/

router.get('/', brainController.getParts);
router.get('/part/:brainpartid', brainController.getPart);
router.get('/createpart', brainController.formCreatePart);
router.post('/createpart', brainController.createPart);
router.get('/deletepart/:brainpartid', brainController.deletePart);

module.exports = router;
