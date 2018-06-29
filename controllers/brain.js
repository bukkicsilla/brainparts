module.exports.getParts = function(req, res){
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
};

module.exports.getPart = function(req, res){
    res.render('part', {title: 'Part of the brain.',
             part: { 
                 name: 'Cerebrum',
                 meaning: 'brain',
                 functionalities: ['Reasoning', 'Recognition', 'Visual Processing', 'Speech']
             }
                       
        });
};