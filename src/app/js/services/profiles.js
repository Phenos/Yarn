yarn.service("profiles", function (Profile, channel) {

    function Profiles () {
        this.index = {};
        this._authenticated = null;
        this._visited = null;
        this._all = [];
        //console.log("profiles", this);
    }

    Profiles.prototype.updated = function () {
        channel.publish("profiles.updated", this);
    };

    Profiles.prototype.get = function (username) {
        var profile;
        if (angular.isDefined(username)) {
            profile = this.index[username];
            if (!profile) {
                profile = new Profile(username);
                this.index[profile.username] = profile;
            }
            this.updated();
        }
        this.all();
        return profile;
    };

    Profiles.prototype.authenticated = function (profile) {
        if (angular.isDefined(profile)) {
            profile.priority = 10;
            this._authenticated = profile;
            this.index[profile.username] = profile;
            this.updated();
        }
        this.all();
        return this._authenticated;
    };

    Profiles.prototype.visited = function (profile) {
        if (angular.isDefined(profile)) {
            profile.priority = 20;
            this._visited = profile;
            this.index[profile.username] = profile;
            this.updated();
        }
        this.all();
        return this._visited;
    };

    Profiles.prototype.all = function () {
        var all = [];
        angular.forEach(this.index, function (profile) {
            all.push(profile);
        });
        this._all = all;
        return all;
    };

    return new Profiles();

});