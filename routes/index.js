var express = require('express');
var router = express.Router();
var fs = require('fs');

router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/encue', require('./encue'));


router.get('/', function(req, res){
    res.redirect('/login')
});    

router.get('/login', function(req, res){
    res.render('pages/login', {'logged':false});
});


    
module.exports = router;