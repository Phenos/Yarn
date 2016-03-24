yarn.service("EditorFile", function (guid,
                                     URI,
                                     session,
                                     loadScript,
                                     yConsole) {

    var baseURI = "";

    function EditorFile(uri, meta) {
        this.guid = guid();
        this._uri = uri;
        this.meta = meta || {};
        this.filterOut = false;
        this.isMain = false;
        this.uri = URI(this._uri);
        this.ready = false;
        this.status = "";
        this.content = null;
        this.originalContent = "";
        this.isSelected = false;
    }

    EditorFile.prototype.sizeInKB = function () {
        var size = 0;
        if (this.meta) {
            size = Math.floor((this.meta.Size / 1000)+1);
        }
        return size;
    };

    EditorFile.prototype.absoluteURI = function () {
        var uri = this.uri;
        if (session.user()) {
            baseURI = "http://storage.yarnstudio.io/" + session.user().username + "/";
            uri = this.uri.absoluteTo(baseURI);
        }
        return uri;
    };

    EditorFile.prototype.relativeToUserURI = function () {
        var uri = this.uri;
        if (session.user()) {
            baseURI = "http://storage.yarnstudio.io/" + session.user().username + "/";
            uri = this.absoluteURI().relativeTo(baseURI);
        }
        return uri;
    };

    EditorFile.prototype.load = function () {
        var self = this;

        self.ready = false;
        self.status = "Loading...";
        loadScript(this.absoluteURI().toString())
            .then(function (script) {
                self.errorCode = null;
                self.ready = true;
                self.status = "Loaded";
                self.content = script.source;
                self.originalContent = script.source;
                //console.log("script:", script);
            })
            .catch(function (e) {
                self.errorCode = e.status;
                self.status = "Failed to load";
                //console.log("Error: ", e);
                yConsole.error("Error while loading file: " + self.absoluteURI().toString());
            });
    };

    EditorFile.prototype.updateStatus = function () {
        var isModified = this.isModified();
        if (isModified) {
            this.status = "Not saved";
        } else {
            this.status = "Saved";
        }
    };

    EditorFile.prototype.isModified = function () {
        return (this.content !== this.originalContent);
    };

    EditorFile.prototype.name = function () {
        return this.uri.filename().replace(".txt", "");
    };

    return EditorFile;
});