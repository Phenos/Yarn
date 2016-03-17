
yarn.service("editors", function () {

    function Editors() {
        this.all = [];
        this.current = null;
    }

    Editors.prototype.add = function (editor) {
        //console.log("editors.add", editor);
        this.all.push(editor);
    };

    Editors.prototype.select = function (editor) {
        //console.log("editors.select", editor);
        this.current = editor;
    };

    Editors.prototype.selectByFile = function (file) {
        //console.log("selectByFile", file);
        var self = this;
        var foundEditor = null;
        angular.forEach(this.all, function (editor) {
            if (file === editor.file) {
                foundEditor = editor;
                self.current = editor;
            }
        });
        return self.current;
    };

    return new Editors();
});