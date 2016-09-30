var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/read', function(req, res, next) {
    res.json({info : "api version 0.0.1", url :  req.url});
});

module.exports = router;
