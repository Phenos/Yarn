yarn.service("session", function ($localStorage) {

    function Session() {
        this._user = null
    }

    Session.prototype.open = function (user) {
        this._user = user;
        if (user) {
            var key = "yarn-" + user.username;
            if (angular.isUndefined($localStorage[key])) {
                $localStorage[key] = {}
            }
            this.storage = $localStorage[key];
        }
        return this;
    };

    Session.prototype.user = function (user) {
        if (angular.isDefined(user)) this._user = user;
        return this._user;
    };


    return new Session();
});