/*module.exports.getParts = function(req, res){
   res.render('index', {title: 'Parts of the Human Brain',
       parts: [{
            name: 'Cerebrum'
       },
        {
            name: 'Cerebellum'
        },
        {
            name: 'Pons'
        }
      ]                   
    });
};*/

/*module.exports.getPart = function(req, res){
    res.render('part', {title: 'Part of the brain.',
             part: { 
                 name: 'Cerebrum',
                 meaning: 'brain',
                 functionalities: ['Reasoning', 'Recognition', 'Visual Processing', 'Speech']
             }
                       
        });
};*/

var request = require('request');
var apiOps = {
  server : "http://localhost:3000"
};
console.log('server ', apiOps.server);
if (process.env.NODE_ENV === 'production') {
    apiOps.server = "https://secret-earth-75939.herokuapp.com";
}

module.exports.getParts = function(req, res){
    var requestOps, path;
    path = '/api/brainparts';
    requestOps = {
       url: apiOps.server + path,
       method:"GET",
        json: {},
        qs: {}
        };
    request(requestOps, function(err, response, body){
        var msg;
      if (!(body instanceof Array)){
        msg = "api lookup error";
        body = [];
    } else {
        if(!body.length){
            msg = "no part found";
        }
    }//else
        //rendering
        res.render('index', {
            title : 'Parts of the Human Brain',
            parts: body,
            message: msg
         });
    })
}

module.exports.getPart = function(req,res){
    var requestOps, path;
    path = "/api/brainparts/" + req.params.brainpartid;
    console.log("path " + path);
    
    requestOps = {
        url: apiOps.server + path,
        method: "GET",
        json: {}
    };
    request(requestOps, 
           function(err, response, body){
            console.log("body "+ body);
            if (response.statusCode === 200){
                console.log('success');
               //renderMovie(req, res, body);   
                res.render('part', {
            title: 'Part info',
            part: body,
            part: {
            name: body.name,
            meaning: body.meaning,
            functionalities: body.functionalities
            }
            
      });
            } else  {
                if (response.statusCode === 404){
                    title = "404, page not found";
                    console.log("Try with a different id, page not found.");
                } else {
                    title = response.statusCode + ", sorry";
                    console.log("something went wrong");
                }
                
           res.status(response.statusCode);
            //console.log(err);
            res.render('error', {
               title: title,
               message: "Try with different id, page not found",
                error: {
                    status: response.statusCode,
                    stack: 'go back to brain part list'
                }
           });   
         }//else
        });//function
}

