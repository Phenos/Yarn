yarn.directive('editorToolbar', EditorToolbarDirective);

function EditorToolbarDirective() {
    return {
        restrict: 'E',
        bindToController: {
            user: "="
        },
        scope: {},
        replace: true,
        transclude: true,
        controllerAs: 'toolbar',
        templateUrl: './html/editorToolbar.html',
        controller: EditorToolbarController
    };

    function EditorToolbarController(assertionBrowser,
                                     root,
                                     IDE) {

        this.IDE = IDE;

        this.hideConsole = function () {
            root.hideConsole();
        };

        this.openAssertionBrowser = function () {
            assertionBrowser.open();
        };

        this.openHelp = function() {
            root.showHelp();
        };
    }
}
