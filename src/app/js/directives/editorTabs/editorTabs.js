(function () {

    yarn.directive('editorTabs', EditorTabsDirective);
    yarn.factory('editorTabs', editorTabsService);

    function EditorTabsDirective() {
        return {
            restrict: 'E',
            bindToController: {
            },
            scope: {},
            controllerAs: 'tabs',
            templateUrl: './html/editorTabs.html',
            controller: editorTabsController
        };

        function editorTabsController(editors,
                                      editorTabs,
                                      editorFiles) {
            var self = this;

            self.selected = 0;

            this.focus = function (file) {
                //console.log("file", file.uri.toString());
                editors.focus(file.uri.toString());
            };

            this.createFile = function (file) {
                editorFiles.save(file);
            };

            this.closeFile = function (file) {
                editorFiles.close(file);
            };

            this.files = editorFiles.files;

            editorTabs.register(this);

        }
    }

    function editorTabsService() {
        var controller;

        function register(ctrl) {
            controller = ctrl;
        }

        return {
            register: register
        }
    }
})();
