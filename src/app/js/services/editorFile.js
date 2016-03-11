yarn.service("EditorFile", function (guid,
                                     URI,
                                     session,
                                     loadScript,
                                     yConsole) {

    var baseURI = "";

    /*
     Profile for the .meta attribute

     {
         Key: 'twitter.YarnStudioGames/winter-storm-draco/player.txt',
         LastModified: Thu Mar 10 2016 14:03:28 GMT-0500 (EST),
         ETag: '"239dee9f8c7bdf7beec35c573f40ca86"',
         Size: 723,
         StorageClass: 'STANDARD',
         Owner: [Object]
     },
     */

    function EditorFile(uri, meta) {
        this.guid = guid();
        this._uri = uri;
        this.meta = meta || {};
        this.filterOut = false;
        this.uri = URI(this._uri);
        if (session.user) {
            //console.log("session", session);
            //todo: put this url in a config file
            baseURI = "http://storage.yarnstudio.io/" + session.user.username + "/";
            this.absoluteURI = this.uri.absoluteTo(baseURI).toString();
        } else {
            this.absoluteURI = this._uri;
        }
        this.ready = false;
        this.status = "";
        this.content = "";
        this.originalContent = "";
    }

    EditorFile.prototype.load = function () {
        var self = this;

        self.ready = false;
        self.status = "Loading...";
        loadScript(this.absoluteURI)
            .then(function (script) {
                self.ready = true;
                self.status = "Loaded";
                self.content = script.source;
                self.originalContent = script.source;
                //console.log("script:", script);
            })
            .catch(function () {
                self.status = "Failed to load";
                yConsole.error("Error while loading file: " + self.absoluteURI);
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

    EditorFile.prototype.save = function () {
        console.log("----- SAVE : ", this.uri);
    };

    EditorFile.prototype.name = function () {
        return this.uri.filename().replace(".yarn.txt", "");
    };

    return EditorFile;
});