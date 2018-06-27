module.exports.getParts = function(req, res){
   res.render('index', {title: 'Parts of the Human Brain'});
};

module.exports.getPart = function(req, res){
    res.render('part', {title: 'Part of the brain.'});
};