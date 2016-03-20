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

    function EditorToolbarController(editors,
                                     assertionBrowser,
                                     root,
                                     tools,
                                     IDE) {
        this.IDE = IDE;

        this.editors = editors;

        this.validate = function() {
            tools.focus("validator");
            this.IDE.validate();
        };

        this.run = function() {
            tools.focus("commands");
            this.IDE.run();
        };

        this.search = function() {
            editors.search();
        };

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
