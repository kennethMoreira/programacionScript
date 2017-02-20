var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/',function(req,res){
    
    
    fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
    
            var loggedUser = {};
            for (var u of objJSONFromFile.usuarios){
                if ( u.key == req.cookies.loggedUserKey){
                    loggedUser.photo = u.photo;
                    loggedUser.name = u.name;
                    loggedUser.userType = u.userType;
                }
            }   
            res.render('pages/encue', {'loggedUser':loggedUser});
    });
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
    fs.writeFile('tmp/' + id + '.json', JSON.stringify(votacion, null, 3), function(err, data){
        if (err){
           console.log(err);
        }
    }); 
    
    var response = {"saved": true, "id": id}
    console.log(response);
    
    res.send(response);
});


router.get('/votos/:id',function(req,res){
    var id = req.params.id;
    var listBinomios = [];
    var listAsambleistas = [];
    var listParlamentarios = [];
    
    fs.readFile('tmp/' + id + '.json', 'utf8',
        function (err, texto) {
        var objJSONFromFile = JSON.parse(texto);
        
            fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile2 = JSON.parse(texto);
            
           
         for (var d of objJSONFromFile2.elecciones[0].binomios){
                        listBinomios.push(d);
                    }
        for (var d of objJSONFromFile2.elecciones[0].asambleistas){
                        listAsambleistas.push(d);
                    }
        for (var d of objJSONFromFile2.elecciones[0].parlamentarios){
                        listParlamentarios.push(d);
                    }
        
        
            var loggedUser = {};
            for (var u of objJSONFromFile.usuarios){
                if ( u.key == req.cookies.loggedUserKey){
                    loggedUser.photo = u.photo;
                    loggedUser.name = u.name;
                    loggedUser.userType = u.userType;
                }
            }    
            res.render('pages/resumen', {'votacion':objJSONFromFile, "binomios":listBinomios,"asambleistas":listAsambleistas,"parlamentarios":listParlamentarios, 'loggedUser':loggedUser});
    });
     })
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
            
           
           var loggedUser = {};
            for (var u of objJSONFromFile.usuarios){
                if ( u.key == req.cookies.loggedUserKey){
                    loggedUser.photo = u.photo;
                    loggedUser.name = u.name;
                    loggedUser.userType = u.userType;
                }
            }
           res.render('pages/binomios', {"binomios":listBinomios,"cedula":cedula, 'loggedUser':loggedUser});

        }
    );
    
});

router.get('/votos/:id/asambleistas',function(req,res){
    var cedula = req.params.id;
    var listAsambleistas = [];
       fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
    for (var d of objJSONFromFile.elecciones[0].asambleistas){
                        listAsambleistas.push(d);
                    }
           
           
           var loggedUser = {};
            for (var u of objJSONFromFile.usuarios){
                if ( u.key == req.cookies.loggedUserKey){
                    loggedUser.photo = u.photo;
                    loggedUser.name = u.name;
                    loggedUser.userType = u.userType;
                }
            }
           
           res.render('pages/asambleistas2', {"asambleistas":listAsambleistas,"cedula":cedula, 'loggedUser':loggedUser});

        }
    );
    
});

router.get('/votos/:id/parlamentarios',function(req,res){
    var cedula = req.params.id;
    var listParlamentarios = [];
       fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            
            for (var d of objJSONFromFile.elecciones[0].parlamentarios){
                listParlamentarios.push(d);
            }
            
           
           
           var loggedUser = {};
            for (var u of objJSONFromFile.usuarios){
                if ( u.key == req.cookies.loggedUserKey){
                    loggedUser.photo = u.photo;
                    loggedUser.name = u.name;
                    loggedUser.userType = u.userType;
                }
            }
           res.render('pages/parlamentarios', {"parlamentarios":listParlamentarios,"cedula":cedula, 'loggedUser':loggedUser});

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

router.put('/votos/:cedula/binomios/:idBinomio', function(req,res){
   var cedula= req.params.cedula; 
    var binomio = req.params.idBinomio;
    console.log(cedula);
    console.log(binomio);
    
    fs.readFile('tmp/' + cedula + '.json', 'utf8',
        function (err, texto) {
        var objJSONFromFile = JSON.parse(texto);
        
        objJSONFromFile.binomio=binomio;
        
        fs.writeFile('tmp/' + cedula + '.json', JSON.stringify(objJSONFromFile, null, 3), function(err, data){
                if (err){
                    console.log(err);
                    res.send({edited:false});
                }else res.send({edited:true});
        }); 
        
        
    });
    
    
});

router.put('/votos/:cedula/asambleistas/:id', function(req,res){
   var cedula= req.params.cedula; 
    var id = req.params.id;
    console.log(cedula);
    console.log(id);
    
    fs.readFile('tmp/' + cedula + '.json', 'utf8',
        function (err, texto) {
        var objJSONFromFile = JSON.parse(texto);
        
        objJSONFromFile.asambleista=id;
        
        fs.writeFile('tmp/' + cedula + '.json', JSON.stringify(objJSONFromFile, null, 3)); 
        
        
    });
    
    
});

router.put('/votos/:cedula/parlamentarios/:id', function(req,res){
   var cedula= req.params.cedula; 
    var id = req.params.id;
    console.log(cedula);
    console.log(id);
    
    fs.readFile('tmp/' + cedula + '.json', 'utf8',
        function (err, texto) {
        var objJSONFromFile = JSON.parse(texto);
        
        objJSONFromFile.parlamentario=id;
        
        fs.writeFile('tmp/' + cedula + '.json', JSON.stringify(objJSONFromFile, null, 3)); 
        
        
    });
    
    
});

//votos/' + votacion.id+'/registrado/binomios/'+binomios.id+'/asambleistas/'+asambleistas.id+'/parlamentarios/'+parlamentarios.id+'/');
router.put('/votos/:cedula/registrado/binomios/:binomioid/asambleistas/:asambleistasid/parlamentarios/:parlamentariosid', function(req,res){
   var cedula= req.params.cedula; 
    var binomioid = req.params.binomioid;
    console.log(cedula);
    console.log(binomioid);
    
//    fs.readFile('tmp/' + cedula + '.json', 'utf8',
//        function (err, texto) {
//        var objJSONFromFile = JSON.parse(texto);
//        
//        objJSONFromFile.parlamentario=id;
//        
//        fs.writeFile('tmp/' + cedula + '.json', JSON.stringify(objJSONFromFile, null, 3)); 
//        
//        
//    });
    
    
});




function isAuthenticated(req, res, next) {
    if (req.cookies.loggedUserKey){
        console.log('COOKIES FOUND');
        var loggedUserKey = req.cookies.loggedUserKey;
        
        fs.readFile("data/exitpoll.json", 'utf8',
            function (err, texto) {
                var objJSONFromFile = JSON.parse(texto);
                
                for (var user of objJSONFromFile.usuarios){
                    if (user.key === loggedUserKey){
                        //El usuario está logeado
                        //Se lo redirige a /admin o /encue dependiendo de que tipo de usuario es
                        console.log('EL USUARIO YA ESTABA LOGEADO');
                        return next();
                    }else {
                        //El id y key encontrados en las cookies no coinciden con un usuario del JSON
                        //Se lo redirige a /login
                        console.log('COOKIES ENCONTRADAS INCORRECTAS');
                    }
                }
            }
        );
    
    }
    console.log('NO HAY COOKIES')
}



module.exports = router;