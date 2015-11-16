angular.module('mindgame').controller('root', rootController);

function rootController(metadata, loadGameScripts, $scope, ngAudio) {
    $scope.metadata = metadata;
    console.info("Yarn game started!");
    loadGameScripts();

    var ambientSound = ngAudio.load("./sounds/166187__drminky__creepy-dungeon-ambience.mp3");
    // todo: Load sound ambience from story
    ambientSound.play();
    ambientSound.loop = true;

}