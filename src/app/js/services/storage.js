yarn.service("storage", function (apiClient, EditorFile, session, yConsole, URI) {

    function Storage() {
        this.files = [];
    }

    Storage.prototype.add = function (uri, meta) {
        // Todo, first check if the file is already there
        var foundSameFile = null;
        var file;
        var _uri = URI(uri);

        angular.forEach(this.files, function (file) {
            if (_uri.equals(file.uri)) {
                foundSameFile = file;
            }
        });

        if (foundSameFile) {
            file = foundSameFile;
            file.meta = meta;
        } else {
            file = new EditorFile(uri, meta);
            this.files.push(file);
        }
        return file;
    };

    Storage.prototype.clear = function (uri) {
        this.files = [];
        return this;
    };

    Storage.prototype.save = function (file, success, failed) {
        self.isLoading = true;
        var savedContent = file.content;
        var user = session.user();
        if (user) {
            var relativeToUserURI = file.relativeToUserURI();
            apiClient.action('saveFile', {
                filename: relativeToUserURI.filename(true),
                uri: relativeToUserURI.toString(),
                content: savedContent,
                token: user.token,
                username: user.username
            }, function(data){
                if (!data.error) {
                    //console.log("?",[savedContent], [file.originalContent]);
                    file.originalContent = savedContent;
                    //console.log("storage.save success", [data]);
                    success(data);
                } else {
                    self.isLoading = false;
                    yConsole.error("An error occurered while trying to load file from storage : " + data.error);
                    failed(data.error);
                }
                // do stuff
            });
        }

    };

    Storage.prototype.refresh = function (uri) {
        var self = this;
        var user = session.user();

        if (user) {
            self.isLoading = true;

            apiClient.action('files', {
                token: user.token,
                username: user.username
            }, function (data) {
                if (!data.error) {
                    //console.log("Storagerefresh > apiClient.files", data);
                    angular.forEach(data.files, function (file) {
                        if (file && file.Size > 0) {
                            var path = file.Key && file.Key.replace(session.user().username + "/", "");
                            if (path) {
                                self.add(path, file);
                            }
                        }
                    });
                    self.isLoading = false;
                } else {
                    self.isLoading = false;
                    yConsole.error("An error occurered while trying to load file from storage");
                }
            }, function (err) {
                console.error(err);
            });

        } else {
            yConsole.error("You must me signed-in to load and save data from your storage.");
        }

        return this;
    };

    return new Storage();
});