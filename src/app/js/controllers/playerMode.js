"use strict";
angular.module('yarn').controller('playerMode', playerModeController);
angular.module('yarn').factory('playerMode', PlayerModeService);


function playerModeController(user,
                        metadata,
                        $scope,
                        $mdSidenav,
                        yConsole,
                        welcomeMessage,
                        stories,
                        playerMode) {

    $scope.user = user; // Note: User not yet in a service, resolved in route instead
    $scope.metadata = metadata; // todo: metadata should be a service

    /*
    Show a welcome message in the yarn console
     */
    yConsole.log("Welcome to <strong>YarnStudio!</strong>");
    yConsole.hint('Enter "<strong>help</strong>" in the command-line bellow to see available commands!');

    // Register with the service
    playerMode.register();
    /*
    Side navigation visibility
     */
    $scope.openSidenav = function () {
        $mdSidenav("leftSidebar").open();
    };

    $scope.closeSidenav = function () {
        $mdSidenav("leftSidebar").close();
    };

    // Play the default story
    stories.playDefault();

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();

}

function PlayerModeService() {
    var service = {};

    var controller;

    service.register = function (controller) {
        service.controller = controller;
    };

    /*
     Console visibility
     */
    service.sidebarIsVisible = false;
    service.showSidebar = function () {
        service.sidebarIsVisible = true;
    };
    service.hideSidenav = function () {
        service.sidebarIsVisible = false;
    };


    return service;
}