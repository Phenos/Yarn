yarn.directive('toolbar', ToolbarDirective);

function ToolbarDirective() {
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

    function ToolbarController(sidebarService, $scope, $window) {

        if (this.user && this.user.username) {
            $scope.avatar = this.user.profiles[0].profile.photos[0].value;
            $scope.username = this.user.profiles[0].profile.displayName;
        }

        this.logout = function () {
            $window.location.href = "/auth/logout";
        };

        this.openSidebar = function() {
            sidebarService.open();
        }
    }
}