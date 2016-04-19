yarn.service("Profile", function (Storage, twitterProfile, URI) {

    // TODO: Put this uri in a config
    var rootURI = "http://storage.yarnstudio.io/";

    function Profile(username, user) {
        var self = this;

        this.username = username;
        this.shortUsername = username.split(".")[1];
        this.user = user || null;
        this.storage = new Storage(this);
        this.twitterProfile = null;
        this.priority = 0;

        twitterProfile(username, function (_twitterProfile) {
            self.twitterProfile = _twitterProfile;
        }, function () {
            self.twitterProfile = false;
        });
    }

    Profile.prototype.baseURI = function() {
        return URI(rootURI + this.username + "/");
    };

    return Profile;

});