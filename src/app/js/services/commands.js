// LEGACY CODE FOR ELECTRON
//if (typeof require !== "undefined") {
//    var remote = require('remote');
//}

angular.module('yarn').factory('commands', commands);

function commands(yConsole,
                  clearCommand,
                  loadCommand,
                  movePlayerCommand,
                  lookPlayerCommand,
                  takePlayerCommand,
                  inventoryPlayerCommand,
                  graphCommand,
                  inventoryCommand,
                  stateCommand,
                  treeCommand,
                  tokensCommand,
                  helpCommand) {

    // todo: command should be injected somewhere else
    // todo: apply injection patter to cleanCommand first
    var commands = {
        playerMove: movePlayerCommand,
        playerLook: lookPlayerCommand,
        playerTake: takePlayerCommand,
        playerInventory: inventoryPlayerCommand,
        clear: clearCommand,
        load: loadCommand,
        graph: graphCommand,
        inventory: inventoryCommand,
        state: stateCommand,
        tree: treeCommand,
        tokens: tokensCommand,
        help: helpCommand
    };

    var command = function (text) {
        var args = text.split(" ");
        var commandStr = args.shift();
        var command = commands[commandStr];
        if (command) {
            yConsole.command(text);
            command(text, args);
        } else {
            yConsole.error("Unknown command : " + text);
            yConsole.hint("Use the <srong>help</srong> to see a list of available commands");
        }
    };

    return {
        command: command
    };

}



