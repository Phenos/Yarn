
yarn.service("editors", function () {

    function Editors() {
        this.all = [];
        this.current = null;
    }

    Editors.prototype.add = function (editor) {
        //console.log("editors.add", editor);
        this.all.push(editor);
        this.select(editor);
    };

    Editors.prototype.select = function (editor) {
        //console.log("editors.select", editor);
        this.current = editor;
        editor.focus();
    };

    Editors.prototype.selectByFile = function (file) {
        //console.log("selectByFile", file);
        var self = this;
        var foundEditor = null;
        angular.forEach(this.all, function (editor) {
            if (file === editor.file) {
                foundEditor = editor;
                self.select(editor);
            }
        });
        return self.current;
    };

    return new Editors();
});