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

            editorFiles.open("./chapters/story.yarn");
            editorFiles.open("./chapters/rooms.yarn");
            editorFiles.open("./chapters/things.yarn");
            editorFiles.open("./chapters/the-unflushed-toilet.yarn");

            //editorFiles.open("./chapters/dialogs.yarn");
            //editorFiles.open("./chapters/kitchen.yarn");

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
