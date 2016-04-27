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
        template:'<md-toolbar class="helpToolbar md-menu-toolbar" layout=row><div flex=100 layout=row><md-toolbar-filler layout layout-align="center center"><md-icon md-svg-icon=./svg-icons/question.svg></md-icon></md-toolbar-filler><div flex=100><h2 class=md-toolbar-tools>Help</h2><md-menu-bar><md-menu><button ng-click=$mdOpenMenu()>Options</button><md-menu-content><md-menu-item><md-button ng-click=toolbar.hideConsole()>Close <span class=md-alt-text>{{ \'M-Esc\' | keyboardShortcut }}</span></md-button></md-menu-item></md-menu-content></md-menu></md-menu-bar></div><div flex=1><md-button class="md-icon-button close-button" ng-click=toolbar.hideHelp() aria-label="Close help"><md-icon md-svg-icon=./svg-icons/close.svg></md-icon></md-button></div></div></md-toolbar>',
        controller: HelpToolbarController
    };

    function HelpToolbarController(root) {

        this.hideHelp = function () {
            root.hideHelp();
        };
    }
}
