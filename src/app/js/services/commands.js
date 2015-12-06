if (require) {
    var remote = require('remote');
    var dialog = remote.require('dialog');
}

angular.module('mindgame').factory('commands', commands);

function commands(storyLogService,
                  yConsole,
                  hotkeys,
                  gameService,
                  game) {

    var storyLog = storyLogService;
    var state = game.state;

    var commands = {
        load: loadCommand,
        move: moveCommand,
        look: lookCommand,
        take: takeCommand,
        graph: graphCommand,
        showInventory: showInventoryCommand,
        inventory: logInventoryCommand,
        state: stateCommand,
        tree: treeCommand,
        tokens: tokensCommand,
        help: helpCommand
    };

    // todo: Move commands into a separate directive
    var command = function (text) {
        var args = text.split(" ");
        var commandStr = args.shift();
        var command = commands[commandStr];
        if (command) {
            yConsole.command(text);
            command(text, args);
        } else {
            yConsole.command(text);
            yConsole.error("Sorry... unknown command!");
        }
    };

    // todo: Move hotkey into a separate directive
    hotkeys.add({
        combo: 'ctrl+1',
        description: 'Output the current state',
        //allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            console.log("command state");
            command("state");
        }
    });
    hotkeys.add({
        combo: 'ctrl+2',
        description: 'Output the execution tree',
        //allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tree");
        }
    });
    hotkeys.add({
        combo: 'ctrl+3',
        description: 'Outputing script parsing',
        //allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tokens");
        }
    });

    hotkeys.add({
        combo: 'ctrl+h',
        description: 'Help',
        callback: function () {
            command("help");
        }
    });

    //todo: Create a class for commands

    function stateCommand() {
        var html = game.state.html();
        yConsole.debug("Outputing current game state:");
        yConsole.debug(html);
    }

    function graphCommand() {
        yConsole.debug('<graph width="800" height="400" thing-is-a="room" predicate="linksto"></graph>');
    }

    function treeCommand() {
        var html = game.scripts[0].ast.html();
        yConsole.debug("Outputing execution tree:");
        yConsole.debug(html);
    }

    function tokensCommand() {
        var html = game.scripts[0].pointer.html();
        yConsole.debug("Outputing script parsing:");
        yConsole.debug(html);
    }

    function moveCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "move");
    }

    function loadCommand(command, args) {
        var url;
        // todo: This code is duplicated... make common
        console.log("dialog", dialog);
        if (!args.length && dialog) {
            url = dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [
                    { name: 'Yarn script', extensions: ['yarn'] }
                    //{ name: 'All Files', extensions: ['*'] }
                ]
            });
            if (url) url = "file://" + url;
        } else {
            url = args[0];
        }
        if (url) {
            gameService.loadFromURL(url);
        }
    }


    function takeCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "take");
    }

    function lookCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "look");
    }

    function helpCommand() {
        yConsole.log("The <em>Yarn</em> console allows you tu run commands and change the story.");
        yConsole.log("Available commands: <em>help</em>, <em>load</em>, <em>inventory</em>, <em>state</em>, <em>tree</em>, <em>tokens</em>");
    }

    function showInventoryCommand() {
        var itemList;
        var thingsInInventory = game.state.resolve("You.hasInInventory");
        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var label = thing.resolveValue("isNamed");
                itemList.push(label);
            });
            var message = [
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            storyLog.log(message.join(""));
        } else {
            storyLog.error("You have nothing in inventory!");
        }
    }

    function logInventoryCommand() {
        var itemList;
        var thingsInInventory = game.state.resolve("You.hasInInventory");
        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var label = thing.resolveValue("isNamed");
                itemList.push(label);
            });
            var message = [
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            yConsole.log(message.join(""));
        } else {
            yConsole.log("You have nothing in inventory!");
        }
    }

    return {
        command: command
    };

}



