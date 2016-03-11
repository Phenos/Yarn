yarn.service("editorFiles", function (EditorFile, confirmAction, session) {

    function EditorFiles() {
        this.files = [];
        this.reloadFromLocalStorage();
    }

    /**
     * Reload the list open files from localStorage
     */
    EditorFiles.prototype.reloadFromLocalStorage = function () {
        var self = this;
        var sessionFiles = session.storage("editorFiles");
        if (sessionFiles) {
            if (angular.isArray(sessionFiles.files)) {
                var oldList = sessionFiles.files;
                sessionFiles.files = [];
                angular.forEach(oldList, function (file) {
                    self.open(file);
                });
            }
        }
    };

    /**
     * Persist on or all files to localStorage
     * @param file
     */
    EditorFiles.prototype.persist = function (file) {
        var self = this;
        var sessionFiles = session.storage("editorFiles");
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