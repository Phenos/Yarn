yarn.factory('loadCommand', loadCommand);

function loadCommand(yConsole,
                     gameService,
                     rememberLastStory) {

    function handler(command, args) {
        var url = args && args[0];

        if (url) {
            rememberLastStory.remember(url);
            gameService.loadFromURL(url);
        } else {
            yConsole.error("Invalid or missing argument");
            yConsole.tip(
                "The <strong>load</strong> command requires that you enter a valid url to load from.<br/>" +
                "Example: load http://someserver.com/some-file.yarn.txt")
        }
    }

    return {
        name: "load",
        shortDescription: "Load a story from a web address",
        longDescription: "Load a story from a web address passed as the first argument.<br />" +
        "The load command will first clear any other story already loaded.<br />" +
        "Ex.: <strong>load http://somewhere.com/some-file.yarn.txt</strong>",
        autocompletePreview: "load <em>http://somewhere.com/some-file.yarn.txt</em>",
        autocompleteText: "load ",
        handler: handler
    };

}