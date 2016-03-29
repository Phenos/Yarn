yarn.service("Profile", function (Storage, twitterProfile) {

    function Profile(username, user) {
        var self = this;

        this.username = username;
        this.user = user || null;
        this.storage = new Storage(this);
        this.twitterProfile = null;
        this.priority = 0;

        twitterProfile(username, function (twitterProfile) {
            console.log("twitterProfile", twitterProfile);
            self.twitterProfile = twitterProfile;
        });
    }

    return Profile;

});