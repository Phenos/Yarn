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

        function editorTabsController($rootScope,
                                      editors,
                                      editorTabs,
                                      editorFiles) {
            var self = this;

            self.selected = 0;

            this.focus = function (file) {
                //console.log("file", file.uri.toString());
                editors.focus(file.uri.toString());
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
