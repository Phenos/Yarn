angular.module('yarn').factory('loadCommand', loadCommand);

function loadCommand(yConsole,
                 gameService,
                 rememberLastStory) {

    return function (command, args) {
        var url;

        // LEGACY CODE FOR ELCTRON BUILD
        //// to do: This code is duplicated... make common
        //if (!args.length && typeof require !== "undefined") {
        //    url = dialog.showOpenDialog({
        //        properties: ['openFile'],
        //        filters: [
        //            {name: 'Yarn script', extensions: ['yarn']}
        //            //{ name: 'All Files', extensions: ['*'] }
        //        ]
        //    });
        //    if (url) url = "file://" + url;
        //} else {
        //    url = args[0];
        //}

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

}