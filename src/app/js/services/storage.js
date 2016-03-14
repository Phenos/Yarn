yarn.service("storage", function (apiClient, EditorFile, session, yConsole) {

    function Storage() {
        this.files = [];
    }

    Storage.prototype.add = function (uri, meta) {
        // Todo, first check if the file is already there
        var file = new EditorFile(uri, meta);
        this.files.push(file);
        return file;
    };

    Storage.prototype.clear = function (uri) {
        this.files = [];
        return this;
    };

    Storage.prototype.save = function (file, success, failed) {
        var user = session.user();
        console.log(">>>>>user", user);
        apiClient.action('saveFile', {
            filename: file.uri.filename(true),
            uri: file._uri,
            content: file.content,
            token: user.token,
            username: user.username
        }, function(data){
            if (!data.error) {
                console.log("storage.save success", [data]);
                success(data);
            } else {
                self.isLoading = false;
                yConsole.error("An error occurered while trying to load file from storage : " + data.error);
                failed(data.error);
            }
            // do stuff
        });

    };

    Storage.prototype.refresh = function (uri) {
        var self = this;

        if (session.user()) {
            self.isLoading = true;


            apiClient.action('files', function (data) {
                console.log("Storagerefresh > apiClient.files", data);
                angular.forEach(data.files, function (file) {
                    if (file && file.Size > 0) {
                        var path = file.Key && file.Key.replace(session.user().username + "/", "");
                        if (path) self.add(path, file);
                    }
                });
                self.isLoading = false;
            }, function () {
                self.isLoading = false;
                yConsole.error("An error occurered while trying to load file from storage");
            });

        } else {
            yConsole.error("You must me signed-in to load and save data from your storage.");
        }

        return this;
    };

    return new Storage();
});