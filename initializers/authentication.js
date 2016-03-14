var Firebase = require("firebase");

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.log("Initialized authentication middleware.");
        api.actions.addMiddleware({
            name: 'authentication',
            global: false,
            priority: 1000,
            preProcessor: function (data, next) {
                //api.log("token" + data.params.token);
                var token = data.params.token;

                var connection = new Firebase("https://yarnstudiodev.firebaseio.com/");
                connection.authWithCustomToken(token, function (error, authData) {
                    if (error) {
                        next(new Error('Login Failed: ' + error));
                    } else {
                        data.user = {
                            username: data.params.username
                        };
                        next();
                    }
                });
            },
            postProcessor: function (data, next) {
                next();
            }
        });

        next();
    },
    start: function (api, next) {
        next();
    },
    stop: function (api, next) {
        next();
    }
}


