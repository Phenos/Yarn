angular.module('yarn').directive('toolbar', ToolbarDirective);

function ToolbarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        replace: true,
        transclude: true,
        controllerAs: 'toolbar',
        templateUrl: './html/toolbar.html',
        controller: ToolbarController
    };

    function ToolbarController(sidebar, $scope) {

        if (this.user && this.user.username) {
            $scope.avatar = this.user.profiles[0].profile.photos[0].value;
            $scope.username = this.user.profiles[0].profile.displayName;
        }

        this.openSidebar = function() {
            sidebar.open();
        }
    }
}