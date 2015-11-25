"use strict";
angular.module('mindgame').controller('root', rootController);

function rootController(metadata, gameController, $scope, yConsole, loadMetadata) {

    $scope.metadata = metadata;
    loadMetadata().then(function (metadata) {
        yConsole.log("Welcome to <strong>Yarn</strong> <em>v" + metadata.version + "</em>");
        yConsole.log('Type <strong>CTRL+H</strong> or enter "<strong>:help</strong>" in the command-line bellow to see available commands!')
    });
    gameController.loadFromPage();

}