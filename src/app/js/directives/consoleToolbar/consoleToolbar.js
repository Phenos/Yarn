angular.module('yarn').directive('consoleToolbar', ConsoleToolbarDirective);

function ConsoleToolbarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        replace: true,
        transclude: true,
        controllerAs: 'toolbar',
        templateUrl: './html/consoleToolbar.html',
        controller: ConsoleToolbarController
    };

    function ConsoleToolbarController() {
    }
}
