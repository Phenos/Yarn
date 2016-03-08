yarn.service("EditorFile", function (guid, URI) {

    function EditorFile(uri) {
        this.guid = guid();
        this.uri = uri;
        this.ready = false;
        this.status = "Loading...";
        this.content = "df SDAFA SD?F";
    }

    EditorFile.prototype.load = function() {
        console.log("----- LOADING : ", this.uri);
    };

    EditorFile.prototype.save = function() {
        console.log("----- SAVE : ", this.uri);
    };

    EditorFile.prototype.name = function () {
        var _uri = URI(this.uri);
        return _uri.filename().replace("." + _uri.suffix(), "");
    };

    return EditorFile;
});