yarn.service("EditorFile", function (guid,
                                     URI,
                                     loadScript,
                                     yConsole) {

    var baseURI = "";

    function EditorFile(uri, meta, profile) {
        this._uri = "";
        this.uri = null;
        this.rename(uri);
        this.guid = guid();
        this.profile = profile;
        this.meta = meta || {};
        this.filterOut = false;
        this.isMain = false;
        this.ready = false;
        this.status = "";
        this.content = null;
        this.originalContent = "";
        this.isSelected = false;
    }

    EditorFile.prototype.rename = function (uri) {
        this._uri = uri.toString();
        this.uri = new URI(this._uri).normalize();
    };

    EditorFile.prototype.sizeInKB = function () {
        var size = 0;
        if (this.meta) {
            size = Math.floor((this.meta.Size / 1000)+1);
        }
        return size;
    };

    EditorFile.prototype.absoluteURI = function () {
        var uri = this.uri;
        if (this.profile) {
            baseURI = "http://storage.yarnstudio.io/" + this.profile.username + "/";
            uri = this.uri.absoluteTo(baseURI);
        }
        return uri;
    };

    EditorFile.prototype.relativeToUserURI = function () {
        var uri = this.uri;
        if (this.profile) {
            baseURI = "http://storage.yarnstudio.io/" + this.profile.username + "/";
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
        return ((this.content !== this.originalContent) && (this.content !== null));
    };

    EditorFile.prototype.name = function () {
        return this.uri.filename();
    };

    return EditorFile;
});