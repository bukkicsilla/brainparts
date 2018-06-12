var express = require('express');
var router = express.Router();
var brainController = require('../controllers/brain');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parts of the Human Brain' });
});*/

router.get('/', brainController.getParts);


module.exports = router;
