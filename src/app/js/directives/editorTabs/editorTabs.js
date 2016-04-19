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

        function editorTabsController(state,
                                      editors,
                                      editorTabs,
                                      editorFiles) {
            var self = this;

            self.selected = 0;

            this.focus = function (file) {
                editors.focus(file.uri.toString());
//                console.log("====================================");
//                console.log("file > ", file);
                state.persistEditorFiles(file);
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
