var express = require('express');
//var cookieParser = require('cookie-parser');
var router = express.Router();
var fs = require('fs');


router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/encue', require('./encue'));


router.get('/', function(req, res){
//    console.log('REQ = "/"')
//    res.redirect('/login');
    
//    console.log('RENDER LOGIN')
    res.render('pages/login');
    
//    fs.readFile("data/exitpoll.json", 'utf8',
//        function (err, texto) {
//            var objJSONFromFile = JSON.parse(texto);
//            
//            for (var user of objJSONFromFile.usuarios){
//                
//            }
//        }
//    );
});





//router.get('/login', function(req, res){
//    
//});


router.get('/logout', function(req, res){
//    res.clearCookie('loggedUserId')
        res.clearCookie('loggedUserKey')
        res.redirect('/')
});

    
module.exports = router;