angular.module('mindgame').controller('root', rootController);

function rootController(metadata, loadGameScripts, $scope) {
    $scope.metadata = metadata;
    console.info("Yarn game started!");
    loadGameScripts();
}