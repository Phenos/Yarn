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
                               $scope,
                               $mdSidenav,
                               $window,
                               session,
                               auth,
                               login,
                               root) {

        if (session.user()) this.user = session.user();

        if (this.user && this.user.username) {
            $scope.avatar = this.user.profileImageURL;
            $scope.displayName = this.user.displayName;
            $scope.username = this.user.username;
        }

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

        this.logout = function () {
            auth.$unauth();
            $window.location.href = "/";
        };

        this.login = function () {
            login();
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
