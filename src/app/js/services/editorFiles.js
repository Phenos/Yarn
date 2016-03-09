yarn.service("editorFiles", function (EditorFile, confirmAction) {

    function EditorFiles() {
        this.files = [];
    }


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

    };

    return new EditorFiles();


});