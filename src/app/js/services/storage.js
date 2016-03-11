yarn.service("storage", function (EditorFile, Story, session) {

    function Storage() {
        this.files = [];
    }

    Storage.prototype.add = function (uri) {
        var file = new EditorFile(uri);
        this.files.push(file);
        return file;
    };

    Storage.prototype.clear = function (uri) {
        this.files = [];
        return this;
    };

    Storage.prototype.refresh = function (uri) {
        var self = this;
        this.clear();

        if (session.user) {
            self.isLoading = true;
            Story.files({}, function (data) {
                angular.forEach(data.files, function (file) {
                    var path = file && file.Key && file.Key.replace(session.user.username + "/", "");
                    if (path) self.add(path);
                });
                self.isLoading = false;
            }, function () {
                self.isLoading = false;
                yConsole.error("An error occurered while trying to load file from storage");
            });

        } else {
            yConsole.error("You must me signed-in to load and save data from your storage.");
        }
        /*
         { Key: 'twitter.YarnStudioGames/winter-storm-draco/player.txt',
         LastModified: Thu Mar 10 2016 14:03:28 GMT-0500 (EST),
         ETag: '"239dee9f8c7bdf7beec35c573f40ca86"',
         Size: 723,
         StorageClass: 'STANDARD',
         Owner: [Object] },
         */

        return this;
    };

    return new Storage();
});