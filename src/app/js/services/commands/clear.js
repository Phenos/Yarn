angular.module('yarn').factory('clearCommand', clearCommand);

function clearCommand(yConsole,
                      game) {

    return function (command, args) {
        yConsole.log("Clearing...");
        console.log(game.state);
    }
    return {
        name: "help",
        keystroke: "ctrl+h",
        shortDescription: "Show console help",
        longDescription:
        "To obtain help on any specific command, you can add another command name as an argument.<br/>" +
        "Ex.: <strong>help inventory</strong>",
        handler: handler
    };

}