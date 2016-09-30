var acl_json = require('./acl_config');
var jwt = require('jwt-simple');
var secret = "sdevesh"; //this should be in config
var RedisUtil = require('./redis_util');
var async = require('async');
var _ = require('lodash');
var Util = {
    getToken : function(jsonData, callback) {
        var token = jwt.encode(jsonData, secret);
        callback(token)
    },
    checkMiddleware : function(req, res, next) {
        if(req.headers.token) {
            var decoded = jwt.decode(req.headers.token, secret);
            try {
                var decoded = jwt.decode(req.headers.token, secret);
                if(decoded) {
                    async.parallel({
                        permission: function(callback) {
                            RedisUtil.getPermissionData(req.permission, function(details){
                                callback(null, details);
                            })
                        },
                        role: function(callback) {
                            RedisUtil.getRolePermissions(decoded.role, function(details){
                                callback(null, details);
                            })
                        }
                    }, function(err, results) {
                        var accessRights = _.find(results.role.permissions, function(o) { return o['permission-id'] == results.permission._id; });
                        //res.json({data : accessRights})
                        if(accessRights[req.access]) {
                            res.json({info : "valid request"})
                        } else {
                            res.json({err : "invalid request"})
                        }
                    });

                    // if(acl_json[decoded.role].indexOf(req.url) > -1) {
                    //     console.log(decoded);
                    //     next()
                    // } else {
                    //     res.json({err : "invalid request"})
                    // }
                } else {
                    res.json({err : "invalid request"})
                }
            } catch (e) {
                res.json({err : e})
            }
        } else {
            if(acl_json['default'].indexOf(req.url) > -1) {
                next()
            } else {
                res.json({err : "invalid request"})
            }
        }
    }
}

module.exports = Util;
