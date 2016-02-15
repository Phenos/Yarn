angular.module('yarn').directive('editorSidebar', EditorSidebarDirective);
angular.module('yarn').factory('editorSidebar', editorSidebarService);

function EditorSidebarDirective() {
    return {
        restrict: 'E',
        //bindToController: {
        //    metadata: "="
        //},
        scope: false,
        replace: true,
        //transclude: true,
        controllerAs: 'sidebar',
        templateUrl: './html/editorSidebar.html',
        controller: EditorSidebarController
    };

    function EditorSidebarController(editorSidebar, $mdSidenav) {
        editorSidebar.register(this);

        this.open = function () {
            console.log("open");
            $mdSidenav("editorSidebar").open();
        };

        this.close = function () {
            console.log("close");
            $mdSidenav("editorSidebar").close();
        };


    }
}

function editorSidebarService() {
    var controller;

    function open() {
        console.log(".open");
        if (controller) controller.open();
    }

    function close() {
        console.log(".close");
        if (controller) controller.close();
    }

    function register(ctrl) {
        controller = ctrl;
    }

    return {
        register: register,
        open: open,
        close: close
    }
}