"use strict";
yarn.controller('root', rootController);
yarn.service('root', rootService);


function rootController(user,
                        $rootScope,
                        $scope,
                        IDE,
                        yConsole,
                        welcomeMessage,
                        editorFiles,
                        root,
                        themes,
                        wallpaper,
                        hotkeys,
                        state,
                        graph) {

    $scope.IDE = IDE;
    $scope.themes = themes;
    $scope.user = user; // Note: User not yet in a service, resolved in route instead
    $scope.editorFiles = editorFiles;

    $scope.graph = graph;

    $scope.toolTabs = {
        selected: 0
    };

    wallpaper.change("/images/splash/splash-bg.jpg");


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
        })
        .add({
            combo: 'mod+h',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            description: 'Show/Hide the help',
            callback: function () {
                root.toggleHelp();
            }
        });


    /*
     Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line bellow to see available commands!');

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

    $scope.openFile = function () {
        IDE.openFromStorage();
    };

    $scope.openMain = function () {
        var main = editorFiles.open("./story.txt");
        editorFiles.mainFile(main);
    };

    /*

     Height permutation between Console and Editor on focus events

     */
    $scope.editorFlexHeight_default = 100;
    $scope.consoleFlexHeight_default = 0;
    $scope.editorFlexHeight = $scope.editorFlexHeight_default;
    $scope.consoleFlexHeight = $scope.consoleFlexHeight_default;
    $scope.onConsoleEscapeFocus = function () {
        $scope.editorFlexHeight = 100;
        $scope.consoleFlexHeight = 0;
    };
    $scope.onConsoleFocus = function () {
        $scope.editorFlexHeight = 60;
        $scope.consoleFlexHeight = 40;
    };

    $scope.focusInspector = function () {
        //console.log($scope.toolTabs.selected);
        $scope.toolTabs.selected = 1;
    };

    $scope.focusConsole = function () {
        $scope.toolTabs.selected = 0;
    };


    $scope.toggleTools = function (value) {
        if (angular.isDefined(value)) {
            $scope.toolsAreVisible = !value;
        }
        if ($scope.toolsAreVisible) {
            $scope.toolsAreVisible = false;
            $scope.onConsoleEscapeFocus();
        } else {
            $scope.toolsAreVisible = true;
            $scope.onConsoleFocus();
        }
    };


    $scope.toggleTools(true);
    // Check if a previously opened story should be loaded
    //IDE.loadRememberedStory();
    IDE.run();


}

function rootService($localStorage, consoleService, help, player) {
    var service = {
        scope: null
    };

    service.register = function (scope) {
        service.scope = scope;
        scope.IDEisVisible = service.IDEisVisible;
        scope.helpIsVisible = service.helpIsVisible;
    };

    /*
     Console visibility
     */
    service.IDEisVisible = false;
    service.helpIsVisible = false;

    function IDEisVisible(value) {
        if (!angular.isUndefined(value)) {
            service.IDEisVisible = value;
            if (service.scope) service.scope.IDEisVisible = value;
        }
        return service.IDEisVisible;
    }

    function helpIsVisible(value) {
        if (!angular.isUndefined(value)) {
            service.helpIsVisible = value;
            if (service.scope) service.scope.helpIsVisible = value;
        }
        return service.helpIsVisible;
    }

    IDEisVisible($localStorage.IDEisVisible);
    helpIsVisible($localStorage.helpIsVisible);

    service.toggleConsole = function () {
        if (service.IDEisVisible) {
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
        $localStorage.IDEisVisible = IDEisVisible(true);
        consoleService.focus();
    };
    service.hideConsole = function () {
        $localStorage.IDEisVisible = IDEisVisible(false);
    };


    /*

     Mechanics for help panel layout

     */
    service.showHelp = function () {
        player.closeSidenav();
        $localStorage.helpIsVisible = helpIsVisible(true);
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