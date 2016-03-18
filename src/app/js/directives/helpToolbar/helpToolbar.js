yarn.directive('helpToolbar', HelpToolbarDirective);

function HelpToolbarDirective() {
    return {
        restrict: 'E',
        bindToController: {
        },
        scope: {},
        replace: true,
        transclude: true,
        controllerAs: 'toolbar',
        templateUrl: './html/helpToolbar.html',
        controller: HelpToolbarController
    };

    function HelpToolbarController(root) {

        this.hideHelp = function () {
            root.hideHelp();
        };
    }
}
