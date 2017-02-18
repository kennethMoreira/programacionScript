var express = require('express');
var router = express.Router();
var fs = require('fs');

// request -> http:/localhost:8081/admin/
router.get('/', function(req, res){
    var key = req.params.key;
    console.log(key)
    res.render('pages/admin', {'logged':true});
});

// request -> http:/localhost:8081/admin/asambleistas
router.get('/:tablename', function(req, res){
    var tableName = req.params.tablename;
    var arr = [];

    fs.readFile("data/exitpoll_prueba.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                    for (var d of objJSONFromFile.elecciones[0][tableName]){
                        arr.push(d);
                    }
                    break;
                case 'elecciones':
                    for (var d of objJSONFromFile.elecciones){
                        arr.push(d);
                    }
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


router.get('/:tablename/:id', function(req, res){
    var tableName = req.params.tablename;
    var rowId = req.params.id;
    var newId = 0;
    var aux = 0;
    var obj = {};
    
    if (rowId === '0'){
        aux = 0;
    }else aux = 1;
    
    fs.readFile("data/exitpoll_prueba.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);    
        
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                        obj = objJSONFromFile.elecciones[0][tableName][rowId - aux];
                        newId = objJSONFromFile.elecciones[0][tableName].length + 1;
                    break;
                case 'elecciones':
                        obj = objJSONFromFile.elecciones[rowId - aux];
                        newId = objJSONFromFile.elecciones.length + 1;
                    break;
                case 'usuarios':
                        obj = objJSONFromFile.usuarios[rowId - aux];
                        newId = objJSONFromFile.usuarios.length + 1;
                    break;
                case 'dignidades':
                    break;
                default:
            }
        
        console.log("nueva id: " + newId)
        if (rowId === '0'){
            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":obj, 'mode':'new', 'newId':newId});
        }else res.render('pages/CRUDinsert', {"tableName":tableName, "obj":obj, 'mode':'edit'});
            
//            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":arr[0]}, function(err, html){
//                res.send(html);
//            });
        }
    );
});


router.post('/:tablename/:id', function(req, res){
    var tableName = req.params.tablename;
    var newObj = {};
    var response = {}
    
    for (var attr in req.body){
        newObj[attr] = req.body[attr];
    }
    
    console.log(newObj)
    
    fs.readFile('data/exitpoll_prueba.json', 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
        
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                        objJSONFromFile.elecciones[0][tableName].push(newObj);
                    break;
                case 'elecciones':
                        obj = objJSONFromFile.elecciones.push(newObj);
                    break;
                case 'usuarios':
                        obj = objJSONFromFile.usuarios.push(newObj);
                    break;
                case 'dignidades':
                    break;
                default:
            }
        fs.writeFile('data/exitpoll_prueba.json', JSON.stringify(objJSONFromFile, null, 3)); 
        res.redirect('/admin/'+ tableName)
    });
});


//router.get('/:asambleistaaaas', function(req, res){
// 
//    var listaAsambleistas = [];
//    
//    fs.readFile("data/exitpoll.json", 'utf8',
//        function (err, texto) {
//            var objJSONFromFile = JSON.parse(texto);
//            
//    for (var d of objJSONFromFile.elecciones[0].asambleistas){
//                        listaAsambleistas.push(d);
//                    }
//            res.render('pages/asambleistas', {"asambleistas":listaAsambleistas});
////            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":arr[0]}, function(err, html){
////                res.send(html);
////            });
//        }
//    );
//});

module.exports = router;