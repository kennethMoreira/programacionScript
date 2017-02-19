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


router.get('/votos/:id',function(req,res){
    var id = req.params.id;
    
    fs.readFile('tmp/' + id + '.json', 'utf8',
        function (err, texto) {
        var objJSONFromFile = JSON.parse(texto);
        
        res.render('pages/resumen', {'votacion':objJSONFromFile});
    });
});



router.get('/votos/:id/binomios',function(req,res){
    
    var listBinomios = [];
       fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
    for (var d of objJSONFromFile.elecciones[0].binomios){
                        listBinomios.push(d);
                    }
            res.render('pages/binomios', {"binomios":listBinomios});

        }
    );
    
});

router.get('/votos/:id/asambleistas',function(req,res){
    
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


module.exports = router;