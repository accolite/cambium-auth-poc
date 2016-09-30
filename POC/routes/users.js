var express = require('express');
var router = express.Router();
var User =  require('../model/user')
var Permission =  require('../model/permission')
var RedisUtil =  require('../util/redis_util')
var Util =  require('../util/util')
var _ = require('lodash');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
    var user = new User({username : req.body.username, password : req.body.password, type : req.body.type,});
    user.save(function(err, user){
        res.json(user);
    })
});

router.post('/login', function(req, res, next) {
    var user = new User({username : req.body.username, password : req.body.password, type : req.body.type,});
    User.findOne({username : req.body.username, password : req.body.password}, function(err, user){
        if(err) {
            res.json({'err' : err})
        }
        if(!user) {
            res.json({'err' : "cant find user"})
        } else {
            Util.getToken({
                id: user._id,
                date : new Date(),
                role : user.type
            }, function(token){
                /*console.log(user, "==================");
                var plainuser  = _.clone(user);
                plainuser.token = token;
                user.token = token;
                console.log(plainuser, "==================");
                console.log(user, "==================");*/
                user = JSON.stringify(user);
                user = JSON.parse(user);
                user.token = token;
                var redis_key =  user._id
                user = JSON.stringify(user);
                RedisUtil.saveData(redis_key, user, function(redis_data) {
                    console.log("saved", redis_data);
                    res.json({token : token})
                })
            })
        }
    })
});

module.exports = router;
