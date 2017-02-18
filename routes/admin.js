var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req, res){
    var key = req.params.key;
    console.log(key)
    res.render('pages/admin', {'logged':true});
});

router.get('/:table', function(req, res){
    console.log(req.url)
    var tableName = req.params.table;
    var arr = [];

    fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                    for (var d of objJSONFromFile.elecciones[0].dignidades[tableName].candidatos){
                        arr.push(d);
                    }
                    break;
                case 'elecciones':
                    break;
                case 'usuarios':
                    for (var u of objJSONFromFile.usuarios){
                        arr.push(u);
                    }
                    break;
                case 'dignidades':
                    break;
                default:
                    
            }
            res.render('pages/CRUDTable', {"tableName":tableName, "array":arr, 'logged':true});
//            res.render('CRUDTable', {"tableName":tableName, "array":arr}, function(err, html){
//                res.send(html);
//            });
        }
    );
    
});


router.get('/:table/insert', function(req, res){
    var tableName = req.params.table;
    var arr = [];
    
    fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                    for (var d of objJSONFromFile.elecciones[0].dignidades[tableName].candidatos){
                        arr.push(d);
                    }
                    break;
                case 'elecciones':
                    break;
                case 'usuarios':
                    for (var u of objJSONFromFile.usuarios){
                        arr.push(u);
                    }
                    break;
                case 'dignidades':
                    break;
                default:
                    
            }
            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":arr[0], 'logged':true});
//            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":arr[0]}, function(err, html){
//                res.send(html);
//            });
        }
    );
});

module.exports = router;