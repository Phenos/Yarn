yarn.service("editorFiles", function (guid, URI) {

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

    function EditorFile(uri) {
        this.guid = guid();
        this.uri = uri;
    }

    EditorFile.prototype.name = function () {
        var _uri = URI(this.uri);
        var filename = _uri.filename();
        var name = filename.replace(_uri.suffix(), "");
        return name;
    };



    return new EditorFiles();


});