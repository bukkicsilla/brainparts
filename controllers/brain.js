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
                console.log('part ID ' + body._id);
               //renderMovie(req, res, body);   
                res.render('part', {
            title: 'Part info',
            brainpart: body,        
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

module.exports.formCreatePart = function(req, res){
    
    res.render('createpart', {
    title: 'Create Brain Part',
    error: req.query.err
  });
    console.log(req.query.err);
}

module.exports.createPart = function(req, res){
 var requestOps, path, postdata;
    path = '/api/brainparts';
    var funclist = req.body.formfunc.split(",");
    var funcdict = [];
    if(funclist[0]!== "") {
        var l = funclist.length;
        var i;
        for (i = 0; i <l; i++){
            funcdict.push({
                "functionality": funclist[i]
            });
        }
    }
    postdata = {
    name: req.body.formname,    
    meaning: req.body.formmeaning,
    functionalities: funcdict
    };
    if (postdata.meaning === ""){
        postdata.meaning = "??";
    }
   
    requestOps = {
    url : apiOps.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.name) {
    res.redirect('/createpart/');
  } else {
    request(
      requestOps,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/');
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/createpart/');
        } else {
        res.status(response.statusCode);
        res.render('error', {
               message: "The name must be unique!",
                error: {
                    status: response.statusCode,
                    stack: 'go back to the form'
                }
  });
        }
      }
    );
  }     
}

module.exports.deletePart = function(req, res){
    var requestOps, path;
    console.log(req.params);
    path = "/api/brainparts/" + req.params.brainpartid;
    console.log("path in delete " + path);
    requestOps = {
        url: apiOps.server + path,
        method: "DELETE",
        json: {}
    };
    request(requestOps, 
           function(err, response, body){
            if (response.statusCode === 204){
                //console.log("ID "+ body_id);
                res.redirect('/');
            } else  {
                if (response.statusCode === 404){
                    title = "404, page not found";
                    console.log("Try with a different id, page not found.");
                } else {
                    title = response.statusCode + ", sorry";
                    console.log("something went wrong");
                }
                
           res.status(response.statusCode);
            res.render('error', {
               title: title,
               message: "Try with different id, page not found",
                error: {
                    status: response.statusCode,
                    stack: 'go back to movie list'
                }
           });    
         }//else
        }
    );
} 


