var express = require('express');
//var cookieParser = require('cookie-parser');
var router = express.Router();
var fs = require('fs');


router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/encue', require('./encue'));


router.get('/', function(req, res){
    res.render('pages/login');
});


router.get('/logout', function(req, res){
        res.clearCookie('loggedUserKey')
        res.redirect('/')
});


//router.get('*', function(req, res){
//    res.redirect('/')
//});
    
module.exports = router;