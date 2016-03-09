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

    function ConsoleToolbarController(assertionBrowser,
                                      consoleService,
                                      root) {
        this.hideConsole = function () {
            root.hideConsole();
        };

        this.openAssertionBrowser = function () {
            assertionBrowser.open();
        };

        this.clearConsole = function () {
            consoleService.clear();
        }
    }
}
