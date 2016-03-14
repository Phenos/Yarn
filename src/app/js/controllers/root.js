"use strict";
yarn.controller('root', rootController);
yarn.service('root', rootService);


function rootController(user,
                        $rootScope,
                        $scope,
                        IDE,
                        yConsole,
                        welcomeMessage,
                        editorService,
                        editorFiles,
                        root,
                        hotkeys) {

    $scope.IDE = IDE;
    $scope.user = user; // Note: User not yet in a service, resolved in route instead
    $scope.editorFiles = editorFiles;

    $scope.toolTabs = {
        selected: 0
    };

    IDE.register($scope);
    // Register with the service
    root.register($scope);


    hotkeys.bindTo($rootScope)
        .add({
            combo: 'mod+esc',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            description: 'Show/Hide the console',
            callback: function () {
                root.toggleConsole();
            }
        });


    /*
     Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line bellow to see available commands!');

    // Check if a previously opened story should be loaded
    //IDE.loadRememberedStory();

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

    $scope.openFile = function () {
        IDE.openFromStorage();
    };

    /*

     Height permutation between Console and Editor on focus events

     */
    $scope.editorFlexHeight_default = 65;
    $scope.consoleFlexHeight_default = 35;
    $scope.editorFlexHeight = $scope.editorFlexHeight_default;
    $scope.consoleFlexHeight = $scope.consoleFlexHeight_default;
    $scope.onConsoleEscapeFocus = function () {
        $scope.editorFlexHeight = 65;
        $scope.consoleFlexHeight = 35;
        editorService.focus();
    };
    $scope.onConsoleFocus = function () {
        $scope.editorFlexHeight = 35;
        $scope.consoleFlexHeight = 65;
    };

    $scope.focusInspector = function () {
        console.log($scope.toolTabs.selected);
        $scope.toolTabs.selected = 1;
    };

    $scope.focusConsole = function () {
        $scope.toolTabs.selected = 0;
    };


}

function rootService($localStorage, consoleService, helpService, player) {
    var service = {
        scope: null
    };

    service.register = function (scope) {
        service.scope = scope;
        scope.consoleIsVisible = service.consoleIsVisible;
        scope.helpIsVisible = service.helpIsVisible;
    };

    /*
     Console visibility
     */
    service.consoleIsVisible = false;
    service.helpIsVisible = false;

    function consoleIsVisible(value) {
        if (!angular.isUndefined(value)) {
            service.consoleIsVisible = value;
            if (service.scope) service.scope.consoleIsVisible = value;
        }
        return service.consoleIsVisible;
    }

    function helpIsVisible(value) {
        if (!angular.isUndefined(value)) {
            service.helpIsVisible = value;
            if (service.scope) service.scope.helpIsVisible = value;
        }
        return service.helpIsVisible;
    }

    consoleIsVisible($localStorage.consoleIsVisible);
    helpIsVisible($localStorage.helpIsVisible);

    service.toggleConsole = function () {
        if (service.consoleIsVisible) {
            service.hideConsole();
        } else {
            service.showConsole();
        }
    };
    service.toggleHelp = function () {
        if (service.helpIsVisible) {
            service.hideHelp();
        } else {
            service.showHelp();
        }
    };

    /*

     Mechanics for console panel layout

     */
    service.showConsole = function () {
        player.closeSidenav();
        $localStorage.consoleIsVisible = consoleIsVisible(true);
        consoleService.focus();
    };
    service.hideConsole = function () {
        $localStorage.consoleIsVisible = consoleIsVisible(false);
    };


    /*

     Mechanics for help panel layout

     */
    service.showHelp = function () {
        player.closeSidenav();
        $localStorage.helpIsVisible = helpIsVisible(true);
        helpService.focus();
    };
    service.hideHelp = function () {
        $localStorage.helpIsVisible = helpIsVisible(false);
    };

    service.focusConsole = function () {
        service.scope.focusConsole();
    };

    service.focusInspector = function () {
        service.scope.focusInspector();
    };

    return service;
}