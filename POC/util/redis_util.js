var redis = require('redis');
var client = redis.createClient(); //creates a new client
var _ = require('lodash'); //creates a new client
client.on('connect', function() {
    console.log('redis connected');
});
var redisUtil = {
    saveData : function(key, value, callback) {
        client.set(key, value, function(err, reply) {
            callback(reply)
        });
    },
    getData : function(key, callback) {
        client.get(key, function(err, reply) {
            callback(reply);
        });
    },
    saveDefaultData : function() {
        var Permission =  require('../model/permission')
        var Role =  require('../model/role')
        client.get('permissions', function(err, reply) {
            if(reply == null) {
                Permission.find({},function(err, data) {
                    client.set('permissions', JSON.stringify(data));
                })
            }
        });
        client.get('roles', function(err, reply) {
            if(reply == null) {
                Role.find({},function(err, data) {
                    client.set('roles', JSON.stringify(data));
                })
            }
        });
    },
    getPermissionData: function(permissionName, callback) {
        client.get('permissions', function(err, reply) {
            var permissions = JSON.parse(reply);
            var permissionDetails = _.find(permissions, function(o) { return o.permissionName == permissionName; });
            callback(permissionDetails);
        });
    },
    getRolePermissions : function(roleName, callback) {
        client.get('roles', function(err, reply) {
            var roles = JSON.parse(reply);
            var rolesDetails = _.find(roles, function(o) { return o.roleName == roleName; });
            callback(rolesDetails);
        });
    }
}

module.exports = redisUtil;
