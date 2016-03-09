yarn.directive('sidebar', function SidebarDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: true,
        replace: true,
        controllerAs: 'sidebar',
        templateUrl: './html/sidebar.html',
        controller: SidebarController
    };

    function SidebarController(sidebar,
                               $mdSidenav,
                               root) {
        var self = this;

        this.showConsole = function () {
            root.showConsole();
        };

        sidebar.register(this);

        this.open = function () {
            $mdSidenav("leftSidebar").open();
        };

        this.close = function () {
            $mdSidenav("leftSidebar").close();
        };

        this.openHelp = function () {
            root.showHelp();
        };

    }
});

yarn.factory('sidebar', function sidebarService() {
    var controller;

    function open() {
        //console.log(".open");
        if (controller) controller.open();
    }

    function close() {
        //console.log(".close");
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
});
