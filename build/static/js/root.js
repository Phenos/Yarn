angular.module('mindgame').controller('root', rootController);

function rootController(loadGameScripts) {
    console.log("Game started!");
    loadGameScripts();
}