var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/',function(req,res){
    res.render('pages/encue');
});

router.post('/votos/:id',function(req,res){
    console.log(req.body.id)
    var id=req.body.id;
    
    var votacion = {
        "id": id,
        "binomio": "",
        "asambleista": "",
        "parlamentario": "",
        "mod": "1",
    }
    fs.writeFile('tmp/' + id + '.json', JSON.stringify(votacion, null, 3)); 
    
    var response = {"saved": true, "id": id}
    console.log(response);
    
    
    res.send(response);
});

router.post('/votos/:id/binomios/:idBinomio', function(req,res){
    var objJSONFromFile;
    var id=req.params.id;
    fs.readFile('tmp/' + id + '.json', 'utf8',
        function (err, texto) {
        objJSONFromFile = JSON.parse(texto);
        });
    objJSONFromFile.binomio=req.params.idBinomio;
    fs.writeFile('tmp/' + id + '.json', JSON.stringify(objJSONFromFile, null, 3));
    
    console.log(objJSONFromFile)
    
});


router.get('/votos/:id',function(req,res){
    var id = req.params.id;
    
    fs.readFile('tmp/' + id + '.json', 'utf8',
        function (err, texto) {
        var objJSONFromFile = JSON.parse(texto);
        
        res.render('pages/resumen', {'votacion':objJSONFromFile});
    });
});



router.get('/votos/:id/binomios',function(req,res){
   var cedula = req.params.id;
   
    var listBinomios = [];
       fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
    for (var d of objJSONFromFile.elecciones[0].binomios){
                        listBinomios.push(d);
                        
                    }
         
            res.render('pages/binomios', {"binomios":listBinomios,"cedula":cedula});
  
        }
    );
    
});

router.get('/votos/:id/asambleistas2',function(req,res){
   var cedula = req.parms.id;
    
    var listAsambleistas = [];
       fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
    for (var d of objJSONFromFile.elecciones[0].asambleistas){
                        listAsambleistas.push(d);
                    }
            res.render('pages/asambleistas2', {"asambleistas":listAsambleistas});

        }
    );
    
});

router.get('/votos/:id/parlamentarios',function(req,res){
    
    var listParlamentarios = [];
       fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
    for (var d of objJSONFromFile.elecciones[0].parlamentarios){
                        listParlamentarios.push(d);
                    }
            res.render('pages/parlamentarios', {"parlamentarios":listParlamentarios});

        }
    );
    
});


router.get('/asambleistas', function(req, res){
 
    var listaAsambleistas = [];
    
    fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
    for (var d of objJSONFromFile.elecciones[0].asambleistas){
                        listaAsambleistas.push(d);
                    }
            res.render('pages/asambleistas', {"asambleistas":listaAsambleistas});
//            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":arr[0]}, function(err, html){
//                res.send(html);
//            });
        }
    );
});



router.put('/votos/:id/binomios/:idBinomio', function(req, res){
    var id = req.params.id;
    var idBinomio = req.params.idBinomio;
    
    var objEdited = req.body;
    console.log("PILAAAA")
      var response = {}
    
    fs.readFile('tmp/'+id+'.json', 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
            objJSONFromFile.binomio=idBinomio;
        
          
            fs.writeFile('tmp/'+id+'.json', JSON.stringify(objJSONFromFile, null, 3), function(err, data){
                if (err){
                    console.log(err);
                    res.send({edited:false});
                }else res.send({edited:true});
            });  
//            res.redirect('/admin/'+ tableName)
        }
    );
});



module.exports = router;