yarn.service("profiles", function () {

    function Profiles () {
        this._authenticated = null;
        this._visited = null;
    }

    Profiles.prototype.authenticated = function (profile) {
        if (angular.isDefined(profile)) {
            this._authenticated = profile;
        }
        return this._authenticatedt;
    };

    Profiles.prototype.visited = function (profile) {
        if (angular.isDefined(profile)) {
            this._visited = profile;
        }
        return this._visited;
    };

    return new Profiles();

});