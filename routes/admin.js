var express = require('express');
var router = express.Router();
var fs = require('fs');

// GET -> http:/localhost:8081/admin/

router.get('/', function(req, res){
    var key = req.params.key;
    console.log(key)
    res.render('pages/admin', {'logged':true});
});

// GET -> http:/localhost:8081/admin/tabla  (Se solicita la lista de *)

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

// GET -> http:/localhost:8081/admin/tabla/id  
//(Se solicita el formulario con la info de la fila id de una tabla.
//en caso de pedirse la id = 0, se cargará el formulario vacío para poder ingresar un nuevo registro.

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
            if (rowId === '0'){
                res.render('pages/CRUDinsert', {"tableName":tableName, "obj":obj, 'mode':'new', 'newId':newId});
            }else res.render('pages/CRUDinsert', {"tableName":tableName, "obj":obj, 'mode':'edit'});
            
//            res.render('pages/CRUDinsert', {"tableName":tableName, "obj":arr[0]}, function(err, html){
//                res.send(html);
//            });
        }
    );
});

// POST -> http:/localhost:8081/admin/tabla/id
//(Guarda los datos de un nuevo registro en la tabla, con dicha id )

router.post('/:tablename/:id', function(req, res){
    var tableName = req.params.tablename;
    var newObj = {};
    var response = {}
    
    for (var attr in req.body){
        newObj[attr] = req.body[attr];
    }
    
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
            fs.writeFile('data/exitpoll_prueba.json', JSON.stringify(objJSONFromFile, null, 3), function(err, data){
                if (err){
                    console.log(err);
                }
            });  
            res.redirect('/admin/'+ tableName)
    });
});

// DELETE -> http:/localhost:8081/admin/tabla/id
//(Borra los datos de un registro con dicha id, en la tabla)

router.delete('/:tablename/:id', function(req, res){
    var tableName = req.params.tablename;
    var rowId = req.params.id;
    
    fs.readFile('data/exitpoll_prueba.json', 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
        
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                        objJSONFromFile.elecciones[0][tableName].splice(rowId -1 , 1);
                    break;
                case 'elecciones':
                        obj = objJSONFromFile.elecciones.splice(rowId -1 , 1);
                    break;
                case 'usuarios':
                        obj = objJSONFromFile.usuarios.splice(rowId -1 , 1);
                    break;
                case 'dignidades':
                    break;
                default:
            }
            fs.writeFile('data/exitpoll_prueba.json', JSON.stringify(objJSONFromFile, null, 3), function(err, data){
                if (err){
                    console.log(err);
                    res.send({deleted:false});
                }else res.send({deleted:true});
            });      
    });
});



router.put('/:tablename/:id', function(req, res){
    var tableName = req.params.tablename;
    var rowId = req.params.id;
    
    var objEdited = req.body;
    console.log("PIAL")
    console.log(objEdited)
    var response = {}
    
    fs.readFile('data/exitpoll_prueba.json', 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            var objAux = {};
        
            switch (tableName){
                case 'asambleistas':
                case 'binomios':
                case 'parlamentarios':
                    objAux = objJSONFromFile.elecciones[0][tableName][rowId - 1];
                    break;
                case 'elecciones':
                    objAux = objJSONFromFile.elecciones[rowId - 1];
                    break;
                case 'usuarios':
                    objAux = objJSONFromFile.usuarios[rowId - 1];
                    break;
                case 'dignidades':
                    break;
                default:
            }
            for (var key in objAux) {
                console.log("Key: " + key)
                if(objEdited[key]){
                    objAux[key] = objEdited[key];
                }
            }
            fs.writeFile('data/exitpoll_prueba.json', JSON.stringify(objJSONFromFile, null, 3), function(err, data){
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