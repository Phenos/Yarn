yarn.service("EditorFile", function (guid,
                                     URI,
                                     channel,
                                     loadScript,
                                     yConsole) {




    function EditorFile(uri, meta, profile) {
        var self = this;
        this.profile = profile;
        this._uri = "";
        this.hasOwnership = false;
        this._filename = "";
        this._sizeInKB = 0;
        this._isModified = false;
        this._absoluteURI = "";
        this.uri = null;
        this.rename(uri);
        this.guid = guid();
        this.meta = meta || {};
        this.filterOut = false;
        this.isMain = false;
        this.ready = false;
        this.status = "";
        this.content = null;
        this.originalContent = "";
        this.isSelected = false;

        var baseURI = "";

        channel.subscribe("profiles.updated", function (profiles) {
            if (self.profile === profiles.authenticated()) {
                self.hasOwnership = true;
            }
        });

    }

    EditorFile.prototype.rename = function (uri) {
        this._uri = uri.toString();
        this.uri = new URI(this._uri).normalize();
        this._filename = this.filename();
        this._absoluteURI = this.absoluteURI();
    };

    EditorFile.prototype.sizeInKB = function () {
        var size = 0;
        if (this.meta) {
            size = Math.floor((this.meta.Size / 1000)+1);
        }
        this._sizeInKB = size;
        return size;
    };

    EditorFile.prototype.absoluteURI = function () {
        var uri = this.uri;
        if (this.profile) {
            baseURI = "http://storage.yarnstudio.io/" + this.profile.username + "/";
            uri = this.uri.absoluteTo(baseURI);
            //console.log("---->", uri.toString());
        } else {
            console.warn("File has no profile: ", uri);
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
                self.sizeInKB();
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
        this.sizeInKB();
    };

    EditorFile.prototype.isModified = function () {
        var isModified = ((this.content !== this.originalContent) && (this.content !== null));
        this._isModified = isModified;
        this.sizeInKB();
        //console.log("isModfied", isModified);
        return isModified;
    };

    EditorFile.prototype.filename = function () {
        return this.uri.filename();
    };

    return EditorFile;
});