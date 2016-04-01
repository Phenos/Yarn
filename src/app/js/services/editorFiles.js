yarn.service("editorFiles", function (EditorFile,
                                      editors,
                                      confirmAction,
                                      $timeout,
                                      yConsole,
                                      URI,
                                      postal) {

    function EditorFiles() {
        this.files = [];
        this._mainFile = null;
        this.goToLine = null;
    }

    EditorFiles.prototype.mainFile = function (file) {
        if (angular.isDefined(file)) {
            if (file !== null) {
                if (angular.isObject(this._mainFile))
                    this._mainFile.isMain = false;
                file.isMain = true;
                this._mainFile = file;
            } else {
                if (angular.isObject(this._mainFile))
                    this._mainFile.isMain = false;
                this._mainFile = null;
            }
            this.publishChange();
        }
        var _mainFile;
        if (angular.isDefined(this._mainFile)) {
            _mainFile = this._mainFile;
        } else {
            // TODO: This doesnt make sense since it is multi-project
            yConsole.log("Opening the default main story file.");
            var url = "http://storage.yarnstudio.io/" + session.user().username + "/story.txt";
            _mainFile = this.open(url);
        }

        return _mainFile;
    };

    EditorFiles.prototype.save = function (file, callback) {
        file.status = "Saving...";
        // todo: is this is circular ?
        var storage = file.profile.storage;
        storage.save(file, function () {
            refreshAfterAWhile(storage);
            file.errorCode = null;
            file.ready = true;
            file.status = "Saved";
            callback && callback(null, file);
        }, function (err) {
            file.errorCode = err.status;
            file.status = "Failed to save";
            console.error("Error while saving file: ", file.absoluteURI(), err);
            yConsole.error("Error while saving file: " + file.absoluteURI().toString());
            callback && callback(err);
        });
    };

    EditorFiles.prototype.rename = function (file, newName, callback) {
        file.status = "Renaming...";
        var newURI = file.uri.clone().filename(newName);
        // todo: is this is circular ?
        var storage = file.profile.storage;
        storage.rename(file, newName, function () {
            //console.log("RENAMED!!!! ", meta);
            file.rename(newURI);
            refreshAfterAWhile(storage);
            file.errorCode = null;
            file.ready = true;
            file.status = "Saved";
            callback && callback(null, file);
        }, function (err) {
            file.errorCode = err.status;
            file.status = "Failed to rename file";
            console.error("Error while renaming file: ", file.absoluteURI(), err);
            yConsole.error("Error while renaming file: " + file.absoluteURI().toString());
            callback && callback(err);
        });
    };

    var refreshTimeout = null;
    function refreshAfterAWhile(storage) {
        //console.log("refreshInAfterAWhile", refreshTimeout);
        if (refreshTimeout) $timeout.cancel(refreshTimeout);
        refreshTimeout = $timeout(function () {
            //console.log("REFRESH!!!");
            storage.refresh();
        }, 1000);
    }

    EditorFiles.prototype.saveAll = function (success, failure) {
        // Iterate trough all open files
        // If they have changed, then them
        var files = this.files;
        var filesToSave = [];
        angular.forEach(files, function (file) {
            if (file.isModified()) {
                filesToSave.push(file);
            }
        });

        function saveNextFile(success, failure) {
            var nextFile = filesToSave.pop();
            //console.log("nextFile", nextFile);
            if (nextFile) {
                // todo: is this is circular ?
                var storage = nextFile.profile.storage;
                storage.save(nextFile, function () {
                    saveNextFile(success, failure);
                }, function (err) {
                    yConsole.error("An errror occured while saving all files");
                    failure && failure(err);
                });
                refreshAfterAWhile(storage);
            } else {
                success && success()
            }
        }

        saveNextFile(success, failure);
    };


    EditorFiles.prototype.new = function (profile) {
        var file = new EditorFile("untitled", null, profile);
        this.files.push(file);
        return file;
    };

    EditorFiles.prototype.get = function (uriOrFile, profile) {
        var match = null;
        var uri = uriOrFile;
        if (angular.isObject(uriOrFile)) {
            uri = uriOrFile.absoluteURI().toString();
        } else {
            uri = URI("http://storage.yarnstudio.io/" + profile.username + "/" + uri).normalize().toString()
        }
        angular.forEach(this.files, function (file) {
            //console.log("===>>>--", file.absoluteURI().toString(), uri);
            if (file.absoluteURI().toString() === uri) match = file;
        });
        //console.log("MATCH", match);
        return match;
    };

    EditorFiles.prototype.open = function (profile, uriOrFile, setFocus, goToLine) {

        // If no profile name is supplied, it takes for granted that the
        // profile name is in the url being oppened
        if (profile !== null) {

            // VERIFY if file is not already in the list of files loaded
            // So we create it or take the object already created
            var file = this.get(uriOrFile, profile);
            if (!file) {
                if (angular.isObject(uriOrFile)) {
                    file = uriOrFile;
                } else {
                    file = new EditorFile(uriOrFile, null, profile);
                }
                this.files.push(file);
            }

            file.load();
            if (goToLine) {
                file.goToLine = goToLine;
            }

            if (setFocus) {
                // Before setting the focus we let the diget cycle complete
                // Otherwise, the editor is not ready when focus is applied
                $timeout(function () {
                    editors.focus(file.uri.toString())
                }, 100);
            }

            this.publishChange(file);
            return file;
        } else {
            console.error("In order to open a file, you must provide a profile object");
            return null
        }
    };

    EditorFiles.prototype.close = function (file) {
        var self = this;
        var _file;
        var index = null;
        for (var i = 0; i < this.files.length; i++) {
            _file = this.files[i];
            if (_file.uri.toString() === file.uri.toString()) {
                index = i;
                break;
            }
        }
        if (index !== null) {
            if (_file.isModified()) {
                confirmAction(
                    "Unsaved changes",
                    "You have unsaved changes in this file.<br/> Are you sure you want to " +
                    "reload this file from storage and <br/><strong>loose those changes</strong> ?",
                    function () {
                        self.files.splice(i, 1);
                    })
            } else {
                self.files.splice(i, 1);
            }
        }

        // Refresh this list of files in localStorage
        this.publishChange()

    };

    EditorFiles.prototype.publishChange = function (file) {
        postal.publish({
            channel: "editorFiles",
            topic: "change",
            data: file
        });
    };


    EditorFiles.prototype.hasUnsaved = function () {
        var hasUnsaved = false;
        var file;
        for (var i = 0; i < this.files.length; i++) {
            file = this.files[i];
            if (file.isModified()) hasUnsaved = true;
        }
        return hasUnsaved;
    };

    return new EditorFiles();


});