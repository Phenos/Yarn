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

        function editorTabsController(editorTabs, editorFiles) {

            editorFiles.open("./story.yarn.txt");
            editorFiles.open("./chapters/rooms.yarn.txt");
            editorFiles.open("./chapters/things.yarn.txt");
            editorFiles.open("./chapters/the-unflushed-toilet.yarn.txt");

            //editorFiles.open("./chapters/dialogs.yarn.txt");
            //editorFiles.open("./chapters/kitchen.yarn.txt");

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
