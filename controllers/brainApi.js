var mongoose = require('mongoose');
var Brain = mongoose.model('Brainpart');

module.exports.allParts = function(req, res){
    Brain.find({}, function(err, docs){
        if (!err){
          res.status(200);
           res.json(docs); 
         } else {throw err;}
       });
}

module.exports.showPart = function(req, res){
    if (req.params && req.params.brainpartid){
      Brain.findById(req.params.brainpartid)
         .exec(function(err, part){
          if (!part){
              res.status(404);
              res.json("id not found");
              return;
          } else if(err){
              res.status(404);
              res.json(err);
              return;
          }
          res.status(200);
          res.json(part);
      });
    } else {
        res.status(404);
        res.json("no id in request");
    }
    
}