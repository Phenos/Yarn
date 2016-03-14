yarn.service("editorFiles", function (EditorFile, confirmAction, session, storage) {

    function EditorFiles() {
        this.files = [];
        this._mainFile = null;
        this.reloadFromLocalStorage();
    }

    /**
     * Reload the list open files from localStorage
     */
    EditorFiles.prototype.reloadFromLocalStorage = function () {
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
                    var newFile = self.open(file);
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
        //console.log("Main file is now ", file);
        return this._mainFile;
    };

    EditorFiles.prototype.save = function (file, callback) {
        file.status = "Saving...";
        var savedContent = self.content;
        storage.save(file, function (meta) {
            console.log("storage.save success ", meta);
            file.ready = true;
            file.status = "Saved";
            file.originalContent = savedContent;
            callback(null, file);
        }, function (err) {
            file.status = "Failed to save";
            console.error("Error while saving file: " + file.absoluteURI, err);
            yConsole.error("Error while saving file: " + file.absoluteURI);
            callback(err);
        });
    };

    /**
     * Persist on or all files to localStorage
     * @param file
     */
    EditorFiles.prototype.persist = function (file) {
        var self = this;
        var sessionFiles = session.storage("editorFiles");

        //console.log("this._mainFile", this._mainFile);
        if (angular.isObject(this._mainFile)) {
            sessionFiles.mainFile = this._mainFile._uri;
        } else {
            delete sessionFiles.mainFile;
        }

        if (sessionFiles) {
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

    EditorFiles.prototype.open = function (uriOrFile) {
        var file;
        if (angular.isObject(uriOrFile)) {
            file = uriOrFile;
        } else {
            file = new EditorFile(uriOrFile);
        }
        file.load();
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
            if (_file === file) {
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

    return new EditorFiles();


});