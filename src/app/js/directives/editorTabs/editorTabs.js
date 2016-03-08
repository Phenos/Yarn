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

        function editorTabsController(editorTabs) {

            this.files = [
                {
                    name: "Test1.yarn.txt",
                    url: "Test1.yarn.txt"
                },
                {
                    name: "Test2.yarn.txt",
                    url: "Test1.yarn.txt"
                },
                {
                    name: "Potatoe.yarn.txt",
                    url: "Potatoe.yarn.txt"
                }
            ];

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
