yarn.directive('sidebar', SidebarDirective);
yarn.factory('sidebarService', sidebarService);

function SidebarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            metadata: "=",
            onOpenConsole: "&"
        },
        scope: true,
        replace: true,
        controllerAs: 'sidebar',
        templateUrl: './html/sidebar.html',
        controller: SidebarController
    };

    function SidebarController(sidebarService,
                               $mdSidenav,
                               welcomeMessage,
                               commands) {
        var self = this;

        sidebarService.register(this);

        this.openConsole = function () {
            console.log("sidebar.openClose");
            self.onOpenConsole();
            self.closeAll();
        };

        this.openStoryMenu = function () {
            $mdSidenav("storySidebar").open();
        };

        this.closeStoryMenu = function () {
            $mdSidenav("storySidebar").close();
        };

        this.openAuthorMenu = function () {
            $mdSidenav("authorSidebar").open();
        };

        this.closeAuthorMenu = function () {
            $mdSidenav("authorSidebar").close();
        };

        this.restartStory = function () {
            commands.command("restart");
            self.closeAll();
        };

        this.closeAll = function () {
            self.close();
            self.closeStoryMenu();
            self.closeAuthorMenu();
        };

        this.open = function () {
            $mdSidenav("leftSidebar").open();
        };

        this.close = function () {
            $mdSidenav("leftSidebar").close();
        };

        this.openWelcomeMessage = function() {
            welcomeMessage.open();
        }

    }
}

function sidebarService() {
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
}