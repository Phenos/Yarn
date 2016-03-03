"use strict";
yarn.controller('playerMode', playerModeController);
yarn.factory('playerMode', PlayerModeService);


function playerModeController(user,
                              $rootScope,
                              $scope,
                              yConsole,
                              welcomeMessage,
                              stories,
                              playerMode,
                              hotkeys) {

    hotkeys.bindTo($rootScope)
        .add({
            combo: 'mod+esc',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            description: 'Show/Hide the console',
            callback: function () {
                playerMode.toggleConsole();
            }
        });

    $scope.user = user; // Note: User not yet in a service, resolved in route instead

    /*
     Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line bellow to see available commands!');

    // Register with the service
    playerMode.register($scope);

    // Play the default story
    stories.playDefault();

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

}

function PlayerModeService($localStorage, consoleService, helpService, player) {
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

    service.showConsole = function () {
        player.closeSidenav();
        $localStorage.consoleIsVisible = consoleIsVisible(true);
        consoleService.focus();
    };
    service.hideConsole = function () {
        $localStorage.consoleIsVisible = consoleIsVisible(false);
    };

    service.showHelp = function () {
        player.closeSidenav();
        $localStorage.helpIsVisible = helpIsVisible(true);
        helpService.focus();
    };
    service.hideHelp = function () {
        $localStorage.helpIsVisible = helpIsVisible(false);
    };

    return service;
}