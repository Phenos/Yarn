angular.module('mindgame').controller('root', rootController);

function rootController(metadata, loadGameScripts, $scope, ngAudio, yConsole, loadMetadata) {

    $scope.metadata = metadata;
    loadMetadata().then(function (metadata) {
        yConsole.log("Welcome to <strong>Yarn</strong> <em>v" + metadata.version + "</em>");
        yConsole.log('Type <strong>CTRL+H</strong> or enter "<strong>:help</strong>" in the command-line bellow to see available commands!')
    });
    loadGameScripts();

    var ambientSound = ngAudio.load("./sounds/166187__drminky__creepy-dungeon-ambience.mp3");
    // todo: Load sound ambience from story
    ambientSound.play();
    ambientSound.loop = true;

}