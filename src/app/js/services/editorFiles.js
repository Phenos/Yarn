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
        this.files.push(file);
        return file;
    };

    EditorFiles.prototype.close = function (uri) {

    };

    return new EditorFiles();


});