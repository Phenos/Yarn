yarn.service("Profile", function (Storage, twitterProfile) {

    function Profile(username, user) {
        var self = this;

        this.username = username;
        this.shortUsername = username.split(".")[1];
        this.user = user || null;
        this.storage = new Storage(this);
        this.twitterProfile = null;
        this.priority = 0;

        twitterProfile(username, function (twitterProfile) {
            self.twitterProfile = twitterProfile;
        }, function () {
            self.twitterProfile = false;
        });
    }

    return Profile;

});