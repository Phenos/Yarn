yarn.service("Storage", function (apiClient, EditorFile, yConsole, URI, postal, session) {

    function Storage(profile) {
        this.profile = profile;
        this.files = [];
        this.projectFolders = {};
    }

    Storage.prototype.directories = function (projectFolder) {
        var _directories = {};
        var filesSource = this.files;
        if (projectFolder) filesSource = projectFolder.files;

        //console.log("Grouping in directories: ", this.files);
        angular.forEach(filesSource, function (file) {
            var directoryURI = file.uri.directory();
            if (projectFolder) {
                var directoryURIparts = directoryURI.split("/");
                directoryURIparts.shift();
                directoryURI = directoryURIparts.join("/");
                //console.log("-->", directoryURI);
            }
            var directory = _directories[directoryURI];
            if (!directory) {
                directory = _directories[directoryURI] = new Directory(directoryURI);
            }
            directory.files.push(file);
        });
        return _directories;
    };

    function Directory(uri) {
        this.uri = uri;
        this.files = [];
    }

    Storage.prototype.sort = function (fileA, fileB) {
        var a = fileA.uri.toString().toLowerCase();
        var b = fileB.uri.toString().toLowerCase();
        this.files.sort(function () {
            return a.localeCompare(b);
        });
    };

    Storage.prototype.add = function (uri, meta) {
        var self = this;
        // Todo, first check if the file is already there
        var foundSameFile = null;
        var file;
        var _uri = URI(uri);
        var isAFolder = false;

        //console.log(meta.Key);
        // If it's a folder
        if (meta.Key[meta.Key.length - 1] === "/") isAFolder = true;

        // Create a projectFolder entry
        // Get the project folder name, then get or create the projectFolder entry
        var parts = meta.Key.split("/");
        if (!isAFolder) parts.pop(); //Remove the filename
        if (parts.length > 1) {
            var key = parts[1];
            var projectFolder = self.projectFolders[key];
            if (!projectFolder) {
                projectFolder = {
                    name: key,
                    files: [],
                    meta: meta
                };
                self.projectFolders[key] = projectFolder;
            }
        }

        if (!isAFolder) {
            angular.forEach(this.files, function (file) {
                if (_uri.equals(file.uri)) {
                    foundSameFile = file;
                }
            });

            if (foundSameFile) {
                file = foundSameFile;
                file.meta = meta;
            } else {
                file = new EditorFile(uri, meta, self.profile);
                this.files.push(file);
                if (projectFolder) projectFolder.files.push(file);
            }

            file.markForDiscard = false;
        }

        return file;
    };

    Storage.prototype.discardMarkedFiles = function () {
        // Todo, first check if the file is already there
        var keptFiles = [];
        angular.forEach(this.files, function (file) {
            if (!file.markForDiscard) {
                keptFiles.push(file);
            }
        });
        this.files = keptFiles;
    };

    Storage.prototype.selection = function () {
        var selection = [];
        angular.forEach(this.files, function (file) {
            if (file.isSelected) selection.push(file);
        });
        return selection;
    };

    Storage.prototype.clear = function (uri) {
        this.files = [];
        return this;
    };

    Storage.prototype.save = function (file, success, failed) {
        var self=  this;
        self.isLoading = true;
        var savedContent = file.content;
        var profile = this.profile;
        var user = session.user();
        if (user) {
            var relativeToUserURI = file.relativeToUserURI();
            apiClient.action('saveFile', {
                filename: relativeToUserURI.filename(true),
                uri: relativeToUserURI.toString(),
                content: savedContent,
                profile: profile.username,
                token: user.token,
                username: user.username
            }, function (data) {
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

    Storage.prototype.rename = function (file, newName, success, failed) {
        var self=  this;
        self.isLoading = true;
        var profile = this.profile;
        var user = session.user();
        if (user) {
            var relativeToUserURI = file.relativeToUserURI();
            var newNameRelativeToUserUID = relativeToUserURI.clone().filename(newName);
            console.log("NEW NAME WILL BE: ", newNameRelativeToUserUID);
            apiClient.action('renameFile', {
                uri_source: relativeToUserURI.toString(),
                uri_destination: newNameRelativeToUserUID.toString(),
                profile: profile.username,
                token: user.token,
                username: user.username
            }, function (data) {
                if (!data.error) {
                    self.isLoading = false;
                    //console.log("?",[savedContent], [file.originalContent]);
                    //file.originalContent = savedContent;
                    console.log("storage.renameFIle success", [data]);
                    success && success(data);
                } else {
                    self.isLoading = false;
                    yConsole.error("An error occurered while trying to rename file in storage : " + data.error);
                    failed && failed(data.error);
                }
            });
        }

    };

    Storage.prototype.delete = function (files, success, failed) {
        var self = this;
        self.isLoading = true;

        var filesMeta = [];
        angular.forEach(files, function (file) {
            filesMeta.push(file.meta);
        });

        console.log("filesMeta", filesMeta);

        var user = session.user();
        var profile = this.profile;

        if (user) {
            apiClient.action('deleteFiles', {
                files: filesMeta,
                profile: profile.username,
                token: user.token,
                username: user.username
            }, function (data) {
                if (!data.error) {
                    self.isLoading = false;
                    console.log("storage.deleteFiles", [data]);
                    success && success(data);
                } else {
                    self.isLoading = false;
                    yConsole.error("An error occurered while trying to delete files in storage : " + data.error);
                    failed && failed(data.error);
                }
            });
        }
    };

    Storage.prototype.refresh = function (uri) {
        var self = this;
        var profile = this.profile;
        var user = session.user();

        if (user) {
            self.isLoading = true;

            var params = {
                profile: profile.username,
                token: user.token,
                username: user.username
            };

            console.log("params", params);
            apiClient.action('files', params , function (data) {
                console.log("s3 data", data);
                if (!data.error) {
                    angular.forEach(self.files, function (file) {
                        file.markForDiscard = true;
                    });

                    //console.log("Storagerefresh > apiClient.files", data);
                    angular.forEach(data.files, function (file) {
                        var path = file.Key && file.Key.replace(profile.username+ "/", "");
                        if (path) {
                            self.add(path, file);
                        }
                    });

                    self.discardMarkedFiles();

                    postal.publish({
                        channel: "storage",
                        topic: "refresh",
                        data: {}
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

    return Storage;
});

