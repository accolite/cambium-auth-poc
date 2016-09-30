var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoleSchema   = new Schema({
    roleName : String,
    permissionId : Schema.Types.ObjectId
});

module.exports = mongoose.model('Role', RoleSchema);
