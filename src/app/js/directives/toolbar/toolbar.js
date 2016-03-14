yarn.directive('toolbar', function ToolbarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        replace: true,
        controllerAs: 'toolbar',
        templateUrl: './html/toolbar.html',
        controller: ToolbarController
    };

    function ToolbarController(sidebar, $scope, $window, commands, auth, login) {

        if (this.user && this.user.username) {
            $scope.avatar = this.user.profileImageURL;
            $scope.username = this.user.displayName;
        }

        this.restartStory = function () {
            commands.command("restart");
        };

        this.logout = function () {
            auth.$unauth();
            $window.location.href = "/";
        };

        this.login = function () {
            login();
        };

        this.openSidebar = function() {
            sidebar.open();
        }
    }
});

