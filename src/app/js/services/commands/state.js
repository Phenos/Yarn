angular.module('yarn').factory('stateCommand', stateCommand);

function stateCommand(yConsole,
                      game) {

    return function stateCommand() {
        var html = game.state.html();
        yConsole.debug("Outputing current game state:");
        yConsole.debug(html);
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