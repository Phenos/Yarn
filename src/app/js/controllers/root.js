angular.module('mindgame').controller('root', rootController);

function rootController(metadata, loadGameScripts, $scope) {
    $scope.metadata = metadata;
    console.log("Game started!");
    loadGameScripts();
}