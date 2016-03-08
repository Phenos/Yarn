yarn.service("editorFiles", function (EditorFile) {

    function EditorFiles() {
        this.files = [];
    }


    EditorFiles.prototype.new = function () {
        var file = new EditorFile("untitled");
        this.files.push(file);
        return file;
    };

    EditorFiles.prototype.open = function (uri) {
        var file = new EditorFile(uri);
        file.load();
        this.files.push(file);
        return file;
    };

    EditorFiles.prototype.close = function (file) {
        var _file;
        for (var i = 0; i < this.files.length; i++) {
            _file = this.files[i];
            if (_file === file) {
                this.files.splice(i, 1);
            }
        }
    };

    return new EditorFiles();


});