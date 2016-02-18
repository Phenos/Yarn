angular.module('yarn').directive('sidebar', SidebarDirective);
angular.module('yarn').factory('sidebarService', sidebarService);

function SidebarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            metadata: "=",
            onOpenConsole: "&"
        },
        scope: true,
        replace: true,
        transclude: true,
        controllerAs: 'sidebar',
        templateUrl: './html/sidebar.html',
        controller: SidebarController
    };

    function SidebarController(sidebarService, $mdSidenav) {
        var self = this;

        sidebarService.register(this);

        this.openConsole = function () {
            console.log("sidebar.openClose");
            self.onOpenConsole();
        };

        this.open = function () {
            $mdSidenav("leftSidebar").open();
        };

        this.close = function () {
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