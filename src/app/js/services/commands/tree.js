angular.module('yarn').factory('treeCommand', treeCommand);

function treeCommand(yConsole,
                     game) {

    return function treeCommand() {
        var html = game.scripts[0].ast.html();
        yConsole.debug("Outputing execution tree:");
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