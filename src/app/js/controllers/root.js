"use strict";
angular.module('yarn').controller('root', rootController);


function rootController(user,
                        metadata,
                        $scope,
                        $mdSidenav,
                        yConsole,
                        welcomeMessage) {

    $scope.user = user; // Note: User not yet in a service, resolved in route instead
    $scope.metadata = metadata; // todo: metadata should be a service


    // Show a welcome message in the yarn console
    yConsole.log("Welcome to <strong>YarnStudio!</strong>");
    yConsole.hint('Enter "<strong>help</strong>" in the command-line bellow to see available commands!');

    $scope.openSidenav = function () {
        $mdSidenav("leftSidebar").open();
    };

    $scope.closeSidenav = function () {
        $mdSidenav("leftSidebar").close();
    };

    // If needed, show a welcome message in a popup
    welcomeMessage.openIfNew();


}
