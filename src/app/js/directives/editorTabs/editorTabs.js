(function () {

    yarn.directive('editorTabs', EditorTabsDirective);
    yarn.factory('editorTabs', editorTabsService);

    function EditorTabsDirective() {
        return {
            restrict: 'E',
            bindToController: {},
            scope: {},
            controllerAs: 'tabs',
            templateUrl: './html/editorTabs.html',
            controller: editorTabsController
        };

        function editorTabsController($rootScope, editorTabs, editorFiles, hotkeys) {
            var self = this;

            self.selected = 0;

            hotkeys.bindTo($rootScope)
                .add({
                    combo: 'alt+tab',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Move to next open file',
                    callback: function (ev) {
                        ev.preventDefault();
                        self.selected = self.selected + 1;
                        if (self.selected > editorFiles.files.length - 1) {
                            self.selected = 0;
                        }
                        //console.log("self.selected", self.selected);
                    }
                })
                .add({
                    combo: 'alt+shift+tab',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Move to previous open file',
                    callback: function (ev) {
                        ev.preventDefault();
                        self.selected = self.selected - 1;
                        if (self.selected < 0) {
                            self.selected = editorFiles.files.length - 1;
                        }
                        //console.log("self.selected", self.selected);
                    }
                });

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
