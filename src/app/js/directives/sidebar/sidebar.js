angular.module('yarn').directive('sidebar', SidebarDirective);
angular.module('yarn').factory('sidebar', sidebarService);

function SidebarDirective() {
    return {
        restrict: 'E',
        //bindToController: {
        //    metadata: "="
        //},
        scope: false,
        replace: true,
        //transclude: true,
        controllerAs: 'sidebar',
        templateUrl: './html/sidebar.html',
        controller: SidebarController
    };

    function SidebarController(sidebar, $mdSidenav) {
        sidebar.register(this);

        this.open = function () {
            console.log("open");
            $mdSidenav("leftSidebar").open();
        };

        this.close = function () {
            console.log("close");
            $mdSidenav("leftSidebar").close();
        };


    }
}

function sidebarService() {
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