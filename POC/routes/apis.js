var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var secret = "sdevesh"
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({info : "api version 0.0.1", url :  req.url});
});

/* GET users listing. */
router.get('/request-token-admin', function(req, res, next) {
    var token = jwt.encode({role : 'admin', date : new Date()}, secret);
    res.json({token : token, info : "this token is for admin"});
});

/* GET users listing. */
router.get('/i-am-admin', function(req, res, next) {
    res.json({hello : "from admin"});
});

router.get('/blog/read', function(req, res, next) {
    res.json({info : "api version 0.0.1", url :  req.url});
});

module.exports = router;
