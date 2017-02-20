var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res){
    var user = req.body.user;
    var pass = req.body.pass;
    var response = {found:false, loggedUser:{}};
    
    fs.readFile("data/exitpoll.json", 'utf8',
        function (err, texto) {
            var objJSONFromFile = JSON.parse(texto);
            for (var u of objJSONFromFile.usuarios ){
                
                if (u.user === user && u.pass === pass){
                    
                    response.found = true;
                    u.key = generateKey();
                    response.loggedUser = u;
                    
                    fs.writeFile('data/exitpoll.json', JSON.stringify(objJSONFromFile, null, 3), function(err, data){
                        if (err){
                            console.log(err);
                        }
                    });  
                    res.cookie('loggedUserKey', response.loggedUser.key);
                    break;
                }
            }
        res.send(JSON.stringify(response));
    });    
})

function generateKey(){
    return Math.random().toString(36).substring(5);
}

module.exports = router;