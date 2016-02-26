"use strict";
yarn.controller('playerMode', playerModeController);
yarn.factory('playerMode', PlayerModeService);


function playerModeController(user,
                              $scope,
                              yConsole,
                              welcomeMessage,
                              stories,
                              playerMode,
                              hotkeys) {

    hotkeys.bindTo($scope)
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

function PlayerModeService($localStorage, consoleService, player) {
    var service = {
        scope: null
    };

    service.register = function (scope) {
        service.scope = scope;
        scope.consoleIsVisible = service.consoleIsVisible;
    };

    /*
     Console visibility
     */
    service.consoleIsVisible = false;

    function consoleIsVisible(value) {
        if (!angular.isUndefined(value)) {
            service.consoleIsVisible = value;
            if (service.scope) service.scope.consoleIsVisible = value;
        }
        return service.consoleIsVisible;
    }

    consoleIsVisible($localStorage.consoleIsVisible);

    service.toggleConsole = function () {
        if (consoleIsVisible) {
            service.hideConsole();
        } else {
            service.showConsole();
        }
    };

    service.showConsole = function () {
        //console.log("showConsole");
        player.closeSidenav();
        $localStorage.consoleIsVisible = consoleIsVisible(true);
        consoleService.focus();
    };
    service.hideConsole = function () {
        //console.log("hideConsole");
        $localStorage.consoleIsVisible = consoleIsVisible(false);
    };

    return service;
}