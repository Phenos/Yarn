yarn.directive('consoleToolbar', ConsoleToolbarDirective);

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

    function ConsoleToolbarController(consoleService,
                                      playerMode) {
        this.hideConsole = function () {
            playerMode.hideConsole();
        };

        this.clearConsole = function () {
            consoleService.clear();
        }
    }
}
