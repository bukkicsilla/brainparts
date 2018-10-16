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
router.get('/updatemeaning/:brainpartid', brainController.formUpdateMeaning);
router.post('/updatemeaning/:brainpartid', brainController.updateMeaning);

router.get('/updatefunctionalities/:brainpartid', brainController.formUpdateFunctionalities);
router.post('/updatefunctionalities/:brainpartid', brainController.updateFunctionalities);

module.exports = router;
