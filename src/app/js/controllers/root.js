angular.module('mindgame').controller('root', rootController);

function rootController(metadata, loadGameScripts, $scope, ngAudio, yConsole, loadMetadata) {
    $scope.metadata = metadata;
    yConsole.log("Welcome to yarn!");
    loadMetadata().then(function (metadata) {
        yConsole.log("version v" + metadata.version);
    });
    loadGameScripts();

    var ambientSound = ngAudio.load("./sounds/166187__drminky__creepy-dungeon-ambience.mp3");
    // todo: Load sound ambience from story
    ambientSound.play();
    ambientSound.loop = true;

}