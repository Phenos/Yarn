angular.module('yarn').factory('graphCommand', graphCommand);

function graphCommand(yConsole) {

    return function graphCommand() {
        yConsole.debug('<graph width="800" height="400" thing-is-a="room" predicate="linksto"></graph>');
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