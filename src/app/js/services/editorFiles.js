yarn.service("editorFiles", function (EditorFile, editors, confirmAction, session, storage, yConsole) {

    function EditorFiles() {
        this.files = [];
        this._mainFile = null;
        this.goToLine = null;
        this.reloadFromLocalStorage();

    }

    /**
     * Reload the list open files from localStorage
     */
    EditorFiles.prototype.reloadFromLocalStorage = function () {
        var lastFocusFromMemory = editors.lastFocusFromMemory();
        var self = this;
        var mainFile = "";
        var sessionFiles = session.storage("editorFiles");
        if (sessionFiles) {
            if (sessionFiles.mainFile) {
                mainFile = sessionFiles.mainFile;
            }
            if (angular.isArray(sessionFiles.files)) {
                var oldList = sessionFiles.files;
                sessionFiles.files = [];
                angular.forEach(oldList, function (file) {
                    var setFocus = false;
                    if (lastFocusFromMemory === file) {
                        setFocus = true;
                    }
                    var newFile = self.open(file, setFocus);
                    if (mainFile === file) {
                        newFile.isMain = true;
                        self.mainFile(newFile);
                    }
                });
            }
        }
    };

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
            this.persist();
        }
        var _mainFile;
        if (angular.isDefined(this._mainFile)) {
            _mainFile = this._mainFile;
        } else {
            yConsole.log("Opening the default main story file.");
            var url = "http://storage.yarnstudio.io/" + session.user().username + "/story.txt";
            _mainFile = this.open(url);
        }

        return _mainFile;
    };

    EditorFiles.prototype.save = function (file, callback) {
        file.status = "Saving...";
        storage.save(file, function (meta) {
            file.ready = true;
            file.status = "Saved";
            callback && callback(null, file);
        }, function (err) {
            file.status = "Failed to save";
            console.error("Error while saving file: ", file.absoluteURI(), err);
            yConsole.error("Error while saving file: " + file.absoluteURI().toString());
            callback && callback(err);
        });
    };

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
            console.log("nextFile", nextFile);
            if (nextFile) {
                storage.save(nextFile, function () {
                    saveNextFile(success, failure);
                }, function (err) {
                    yConsole.error("An errror occured while saving all files");
                    failure && failure(err);
                })
            } else {
                success && success()
            }
        }

        saveNextFile(success, failure);
    };

    /**
     * Persist on or all files to localStorage
     * @param file
     */
    EditorFiles.prototype.persist = function (file) {
        var self = this;
        var sessionFiles = session.storage("editorFiles");

        if (sessionFiles) {
            //console.log("this._mainFile", this._mainFile);
            if (angular.isObject(this._mainFile)) {
                sessionFiles.mainFile = this._mainFile._uri;
            } else {
                delete sessionFiles.mainFile;
            }

            if (!angular.isArray(sessionFiles.files))
                sessionFiles.files = [];

            if (file) {
                sessionFiles.files.push(file._uri);
            } else {
                sessionFiles.files = [];
                angular.forEach(self.files, function (file) {
                    sessionFiles.files.push(file._uri);
                });
            }
        }
    };

    EditorFiles.prototype.new = function () {
        var file = new EditorFile("untitled");
        this.files.push(file);
        return file;
    };

    EditorFiles.prototype.open = function (uriOrFile, setFocus, goToLine) {
        var file;
        if (angular.isObject(uriOrFile)) {
            file = uriOrFile;
        } else {
            file = new EditorFile(uriOrFile);
        }
        if (setFocus) {
            file.isFocused = true;
        } else {
            file.isFocused = false;
        }
        file.load();
        if (goToLine) {
            file.goToLine = goToLine;
        }
        this.files.push(file);
        this.persist(file);
        return file;
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
        this.persist()

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