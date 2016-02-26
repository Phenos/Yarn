"use strict";
yarn.controller('playerMode', playerModeController);
yarn.factory('playerModeService', PlayerModeService);


function playerModeController(user,
                              $scope,
                              yConsole,
                              welcomeMessage,
                              stories,
                              playerModeService,
                              hotkeys) {

    hotkeys.bindTo($scope)
        .add({
            combo: 'mod+esc',
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            description: 'Show/Hide the console',
            callback: function () {
                playerModeService.toggleConsole();
            }
        });

    $scope.user = user; // Note: User not yet in a service, resolved in route instead

    // Service for playerMode UI interaction
    $scope.playerModeService = playerModeService;

    /*
     Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>Yarn Studio!</strong>");
    yConsole.tip('Enter "<span command>help</span>" in the command-line bellow to see available commands!');

    // Register with the service
    playerModeService.register($scope);

    // Play the default story
    stories.playDefault();

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

}

function PlayerModeService($localStorage, consoleService) {
    var service = {
        scope: null
    };

    service.register = function (scope) {
        service.scope = scope;
    };


    /*
     Console visibility
     */
    service.consoleIsVisible = false;

    if (!angular.isUndefined($localStorage.consoleIsVisible)) {
        service.consoleIsVisible = $localStorage.consoleIsVisible;
    }

    service.toggleConsole = function () {
        if (service.consoleIsVisible) {
            service.hideConsole();
        } else {
            service.showConsole();
        }
    };

    service.showConsole = function () {
        console.log("showSidebar");
        service.scope.closeSidenav();
        service.consoleIsVisible = true;
        consoleService.focus();
        $localStorage.consoleIsVisible = true;
    };
    service.hideConsole = function () {
        console.log("hideSidebar");
        service.consoleIsVisible = false;
        $localStorage.consoleIsVisible = false;
    };

    return service;
}