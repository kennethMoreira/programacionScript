var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname +'/public'));
app.set('view engine', 'ejs');

app.use('/', require('./routes'));



//app.get('/user/:id', function (req, res) {
//
//  fs.readFile( __dirname + "/" + "usuario.json", 'utf8', function (err, data) {
//    data = JSON.parse(data);
//    var usuario = null;
//    for(i in data){
//      if(data[i].id == req.params.id){
//        usuario = data[i];
//      }
//    }
//    console.log( usuario );
//    //res.end( JSON.stringify(usuario) );
//    res.render('paginas/regUsuario', {"user": usuario});
//   });
//
//});
//
//
//app.get('/dona/:id', function (req, res) {
//
//  fs.readFile( __dirname  + "/" +  "donuts.json", 'utf8',
//   function (err, texto) {
//    var obj = JSON.parse(texto);
//    var idDona = req.params.id;
//      var arrDonas = obj.items.item;
//      var dona = {};
//
//    for(i in arrDonas){
//      console.log(arrDonas[i].name);
//      if(arrDonas[i].id == idDona){
//        
//        dona = arrDonas[i];
//
//      }
//    }
//    res.render('formDona', {'donut': dona});
//   });
//
//});
//
//
//app.post('/dona/:id', function(req, res){
//    var dona = {
//        'id':   req.params.id,
//        'name': req.body.name,
//        'type': req.body.type,
//        'ppu':  req.body.ppu,
//    };
//    console.log(dona);
//    
//    fs.readFile( __dirname  + "/" +  "donuts.json", 'utf8',
//    function (err, texto) {
//        var obj = JSON.parse(texto);
//        var arrDonas = obj.items.item;
//
//    for(i in arrDonas){
//      if(arrDonas[i].id == dona.id){
//        dona.batters = arrDonas[i].batters;
//        dona.topping = arrDonas[i].topping;
//        arrDonas[i] = dona;
//        modificado = true;
//      }
//    }
//    obj.items.item = arrDonas;
//    fs.writeFile('donuts.json', JSON.stringify(obj));
//    if (modificado)
//        res.send('OK');
//    else res.send('Error al actualizar');
//   });
//
//});










var server = app.listen(8081, function () {
	console.log("Listening at http://localhost:8081")
});