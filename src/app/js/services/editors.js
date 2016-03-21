
yarn.service("editors", function (state) {

    function Editors() {
        this.all = [];
        this.current = null;
    }

    Editors.prototype.lastFocusFromMemory = function () {
        var storage = state.getStoryLocalStorage("editors");
        var fileURI = storage.lastOpenFile;
        //console.log("focusFromMemory", fileURI);
        return fileURI;
        //if (fileURI) this.focus(fileURI);
    };

    Editors.prototype.add = function (editor) {
        //console.log("editors.add", editor);
        this.all.push(editor);
    };

    Editors.prototype.focus = function (fileURI) {
        var self = this;
        //console.log("editors.select", editor);
        var storage = state.getStoryLocalStorage("editors");
        //console.log("Editors.focus", fileURI, this.all);
        angular.forEach(this.all, function (_editor) {
            if (fileURI === _editor.file.uri.toString()) {
                self.current = _editor;
                storage.lastOpenFile = fileURI;
                //console.log(".focus storage.lastOpenFile ",fileURI);
                _editor.focus();
            } else {
                _editor.blur();
            }
        });

    };

    Editors.prototype.search = function () {
        this.current && this.current.search();
    };

    Editors.prototype.selectByFile = function (file) {
        //console.log("selectByFile", file);
        var self = this;
        var foundEditor = null;
        angular.forEach(this.all, function (editor) {
            if (file === editor.file) {
                foundEditor = editor;
                self.focus(editor.file.uri.toString());
            }
        });
        return self.current;
    };

    return new Editors();
});