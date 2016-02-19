angular.module('yarn').factory('clearCommand', clearCommand);

function clearCommand(yConsole,
                      game) {

    return function (command, args) {
        yConsole.log("Clearing...");
        console.log(game.state);
    }

}