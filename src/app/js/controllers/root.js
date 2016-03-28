"use strict";
yarn.controller('root', rootController);
yarn.service('root', rootService);


function rootController(user,
                        $localStorage,
                        $scope,
                        $element,
                        IDE,
                        yConsole,
                        welcomeMessage,
                        editorFiles,
                        root,
                        themes,
                        wallpaper,
                        tools,
                        $timeout,
                        fireOnResizeEvent,
                        globalContextMenu,
                        $state) {

    console.log("state.params:", $state);
    $scope.IDE = IDE;
    $scope.themes = themes;
    $scope.user = user; // Note: User not yet in a service, resolved in route instead
    $scope.editorFiles = editorFiles;

    // Used by the global context menu
    globalContextMenu.register($scope, $element);

    // Restore previously openned files
    editorFiles.reloadFromLocalStorage();

    $scope.toolTabs = {
        selected: 0
    };

    wallpaper.change("/images/splash/splash-bg.jpg");

    IDE.register($scope);

    // Register with the service
    root.register($scope);

    /*
     Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line bellow to see available commands!');

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

    $scope.openMain = function () {
        var main = editorFiles.open("./story.txt", true);
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
        $scope.editorFlexHeight = 50;
        $scope.consoleFlexHeight = 50;
    };

    $scope.focusInspector = function () {
        //console.log($scope.toolTabs.selected);
        $scope.toolTabs.selected = 1;
    };

    $scope.focusConsole = function () {
        $scope.toolTabs.selected = 0;
    };


    $scope.toggleTools = function (value) {
        // Trigger window resize to fix a glitch with the grid resize
        $timeout(function () {
            fireOnResizeEvent();
        }, 500);
        if (angular.isDefined(value)) {
            $scope.toolsAreVisible = value;
            if ($scope.toolsAreVisible) {
                $scope.onConsoleFocus();
            } else {
                $scope.onConsoleEscapeFocus();
            }
        } else {
            if ($scope.toolsAreVisible) {
                $scope.toolsAreVisible = false;
                $scope.onConsoleEscapeFocus();
            } else {
                $scope.toolsAreVisible = true;
                $scope.onConsoleFocus();
            }
        }
        $localStorage.toolsAreVisible = $scope.toolsAreVisible;
    };
    $scope.toggleTools($localStorage.toolsAreVisible);
    tools.focusFromMemory();



    // Check if a previously opened story should be loaded
    //IDE.loadRememberedStory();
    IDE.run(function () {
        $scope.openMain();
        IDE.run();
    });

}

function rootService($localStorage, consoleService, player) {
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

    service.toggleTools = function (value) {
        service.scope.toggleTools(value);
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