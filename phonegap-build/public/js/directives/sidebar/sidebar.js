yarn.directive('sidebar', function SidebarDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: true,
        replace: true,
        controllerAs: 'sidebar',
        template:'<div class=sidebar><md-sidenav flex=100 class="md-sidenav-left md-whiteframe-z2" md-component-id=leftSidebar><md-toolbar><div class=md-toolbar-tools><md-button ng-click=sidebar.close() class=md-icon-button aria-label="Close menu"><md-icon md-svg-icon=/svg-icons/back.svg></md-icon></md-button><h2>Menu</h2></div></md-toolbar><md-content layout-padding><div ng-if=username class=logged-in-as layout=row><div style="width: 60px;"><img ng-if=username class=avatar ng-src="{{ avatar | biggerProfileImage}}"></div><div flex><span class=connected-as-label>You are connected as</span><br><span class=username>{{ displayName }}</span></div></div><md-menu-item ng-if=username><md-button ui-sref="profile({ profile: username })" aria-label="Your profile"><md-icon md-svg-icon=/svg-icons/profile.svg></md-icon>Your Profile</md-button></md-menu-item><md-menu-item ng-if=!username class=login-with-twitter><md-button ng-click=sidebar.login()><md-icon md-svg-icon=/svg-icons/twitter.svg></md-icon>Login with Twitter</md-button></md-menu-item><md-menu-item ng-if=username hide-xs><md-button ng-click=sidebar.showConsole() aria-label="Open console"><md-icon md-svg-icon=/svg-icons/author.svg></md-icon>Story Editor</md-button></md-menu-item><md-divider></md-divider><md-menu-item><md-button ng-click=sidebar.openHelp()><md-icon md-svg-icon=/svg-icons/question.svg></md-icon><span>Help</span></md-button></md-menu-item><md-menu-item><md-button ng-href="http://www.yarnstudio.io/" target=_blank><md-icon md-svg-icon=/svg-icons/blog.svg></md-icon>News and Development Blog</md-button></md-menu-item><md-menu-item><md-button ng-href=https://twitter.com/YarnStudioGames target=_blank><md-icon md-svg-icon=/svg-icons/twitter.svg></md-icon>Follow Us</md-button></md-menu-item><md-divider></md-divider><md-menu-item><md-button ng-click=sidebar.logout()><md-icon md-svg-icon=/svg-icons/logout.svg></md-icon>Logout</md-button></md-menu-item></md-content></md-sidenav></div>',
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

        if (session.user()) {
            this.user = session.user();
        }

        if (this.user && this.user.username) {
            $scope.avatar = this.user.profileImageURL;
            $scope.displayName = this.user.displayName;
            $scope.username = this.user.username.split('.')[1];
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
//        console.log(".open");
        if (controller) {
            controller.open();
        }
    }

    function close() {
//        console.log(".close");
        if (controller) {
            controller.close();
        }
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
