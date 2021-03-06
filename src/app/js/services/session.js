yarn.service("session", function ($localStorage) {

    function Session() {
        this._user = null;
        this._storage = null;
    }

    Session.prototype.open = function (user) {
        console.info("Session open for " + user.username, [user]);
        if (user) {
            this.user(user);
            var key = "yarn-" + user.username;
            if (angular.isUndefined($localStorage[key])) {
                $localStorage[key] = {}
            }
            this._storage = $localStorage[key];
        }
        return this;
    };

    Session.prototype.user = function (user) {
        if (angular.isDefined(user)) {
            this._user = user;
        }
        return this._user;
    };

    /**
     * Return either the global session storage object, or return a key.
     * Initialize the key as a new object if needed.
     * @param {string} key A unique key identifying the storage object
     * @returns {Object} A object which will be persited in local storage
     */
    Session.prototype.storage = function (key) {
        var obj = this._storage;
        if (angular.isObject(obj)) {
            if (key) {
                if (angular.isUndefined(obj[key])) {
                    obj[key] = {};
                }
                obj = obj[key];
            }
        }
        return obj;
    };

    return new Session();
});