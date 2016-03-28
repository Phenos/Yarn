yarn.service("profiles", function (Profile) {

    function Profiles () {
        this.all = {};
        this._authenticated = null;
        this._visited = null;
        console.log("profiles", this);
    }

    Profiles.prototype.get = function (username) {
        var profile;
        if (angular.isDefined(username)) {
            profile = this.all[username];
            if (!profile) {
                profile = new Profile(username);
                this.all[profile.username] = profile;
            }
        }
        return profile;
    };

    Profiles.prototype.authenticated = function (profile) {
        if (angular.isDefined(profile)) {
            this._authenticated = profile;
            this.all[profile.username] = profile;
        }
        return this._authenticatedt;
    };

    Profiles.prototype.visited = function (profile) {
        if (angular.isDefined(profile)) {
            this._visited = profile;
            this.all[profile.username] = profile;
        }
        return this._visited;
    };

    return new Profiles();

});