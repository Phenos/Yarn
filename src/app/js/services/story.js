yarn.service("Story", function (URI, channel) {


    function Story(id, profile) {
        this.id = id;
        this.profile = profile;
        this.exists = null;

        var uri = [
            "/",
            this.profile.username,
            "/",
            this.id,
            "/story.txt"
        ].join("");

        this.url = new URI(uri);
    }

    Story.prototype.ifExists = function (success, fail) {
        var self = this;
        console.log("Story.isExists()");
        var refreshedOnce = this.profile.storage.refreshedOnce;
        var folders = this.profile.storage.allProjectFolders;
        if (refreshedOnce) {
            console.log("resolving ifExists");
            var exists = false;
            angular.forEach(folders, function (folder) {
                if (folder.name === self.id) exists = true;
            });
            this.exists = exists;
            if (this.exists) {
                success && success(this);
            } else {
                fail && fail();
            }
        } else {
            console.log("ifExists defered!");

            var onRefresh = channel.subscribe("storage.refresh", function (storage) {
                if (storage.profile === self.profile) {
                    console.log("Story storage refreshed!");
                    onRefresh.unsubscribe();
                    self.ifExists(success, fail);
                }
            });
        }
    };

    return Story;

});