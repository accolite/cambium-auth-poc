var acl_json = {
    "admin" : [
        "/i-am-admin"
    ],
    "user" : [
        "/i-am-user"
    ],
    "default" : [
        "/",
        "/request-token-admin",
        "/request-token-url"
    ]
};

var acl_json =
    {
        "roles": [
            {
            "roleName": "anonymous",
            "permissions": [
                {
                    "permission-id":"abc",
                    "read": true,
                    "write": true,
                },
                {
                    "permission-id":"def",
                    "read": true,
                    "write": true,
                }
            ]
    		}
        ],
        "permissions": [{
            "_id": "abc",
            "permissionName": "registration",
            "resources": [
                "/",
                "/request-token-admin",
                "/request-token-url"
            ]
    	},
        {
            "_id": "def",
            "permissionName": "registration-read",
            "resources": ["/api/c","/api/d"]
        }]
    }

module.exports = acl_json;
