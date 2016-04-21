
yarn.service("editors", function (storyLocalStorage) {

    function Editors() {
        this.all = [];
        this.current = null;
    }

    Editors.prototype.lastFocusFromMemory = function () {
        var storage = storyLocalStorage.get("editors");
        var fileURI = storage.lastOpenFile;
//        console.log("focusFromMemory", fileURI);
        return fileURI;
//        if (fileURI) this.focus(fileURI);
    };

    Editors.prototype.add = function (editor) {
//        console.log("editors.add", editor);
        this.all.push(editor);
    };

    Editors.prototype.focus = function (fileURI) {
        var self = this;
//        console.log("editors.select", editor);
        var storage = storyLocalStorage.get("editors");
//        console.log("Editors.focus", fileURI, this.all);
        angular.forEach(this.all, function (_editor) {
//            console.log(fileURI, _editor.file.uri.toString());
            if (fileURI === _editor.file.uri.toString()) {
                self.current = _editor;
                storage.lastOpenFile = fileURI;
//                console.log(" > _editor.focus()",fileURI);
                _editor.focus();
            } else {
                _editor.blur();
            }
        });

    };

    Editors.prototype.search = function () {
        this.current && this.current.search();
    };

    return new Editors();
});