var express = require('express');
var router = express.Router();
var fs = require('fs');

router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));


router.get('/', function(req, res){
    res.redirect('/login')
});    

router.get('/login', function(req, res){
    res.render('pages/login', {'logged':false});
});

router.get('/:encuestadorrrr',function(req,res){
    
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

router.get('/:asambleistaaaas', function(req, res){
 
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