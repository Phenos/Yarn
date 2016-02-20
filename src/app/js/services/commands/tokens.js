angular.module('yarn').factory('tokensCommand', tokensCommand);

function tokensCommand(yConsole,
                       game) {

    return function tokensCommand() {
        var html = game.scripts[0].pointer.html();
        yConsole.debug("Outputing script parsing:");
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