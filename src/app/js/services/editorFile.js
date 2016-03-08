yarn.service("EditorFile", function (guid,
                                     URI,
                                     session,
                                     loadScript,
                                     yConsole) {

    var baseURI = "";

    function EditorFile(uri) {
        this.guid = guid();
        this._uri = uri;
        this.uri = URI(this._uri);
        if (session.user) {
            //console.log("session", session);
            baseURI = "http://storage.yarnstudio.io/" + session.user.username + "/";
            this.absoluteURI = this.uri.absoluteTo(baseURI).toString();
        } else {
            this.absoluteURI = this._uri;
        }
        this.ready = true;
        this.status = "";
        this.content = "";
    }

    EditorFile.prototype.load = function () {
        var self = this;
        this.ready = false;
        this.status = "Loading...";
        loadScript(this.absoluteURI)
            .then(function (script) {
                self.status = "Loaded";
                self.content = script.source;
                //console.log("script:", script);
            })
            .catch(function () {
                self.status = "Failed loading";
                yConsole.error("Error while loading file: " + self.absoluteURI);
            });
    };

    EditorFile.prototype.save = function () {
        console.log("----- SAVE : ", this.uri);
    };

    EditorFile.prototype.name = function () {
        return this.uri.filename().replace("." + this.uri.suffix(), "");
    };

    return EditorFile;
});