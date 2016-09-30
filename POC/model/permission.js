var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PermissionSchema   = new Schema({
    permissionName : String,
    resources : Schema.Types.Mixed
});

module.exports = mongoose.model('Permission', PermissionSchema);
