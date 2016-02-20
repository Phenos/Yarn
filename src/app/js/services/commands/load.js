angular.module('yarn').factory('loadCommand', loadCommand);

function loadCommand(yConsole,
                 gameService,
                 rememberLastStory) {

    return function (command, args) {
        var url;

        if (url) {
            rememberLastStory.remember(url);
            gameService.loadFromURL(url);
        } else {
            yConsole.error("Invalid or missing argument");
            yConsole.hint(
                "The <strong>load</strong> command requires that you enter a valid url to load from.<br/>" +
                "Example: load http://someserver.com/some-file.yarn.txt")
        }
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