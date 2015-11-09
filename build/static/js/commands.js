angular.module('mindgame').factory('commands', commands);

function commands(storyLogService,
                  hotkeys,
                  game) {

    var storyLog = storyLogService;
    var state = game.state;

    var commands = {
        move: moveCommand,
        look: lookCommand,
        take: takeCommand,
        inventory: inventoryCommand,
        state: stateCommand,
        tree: treeCommand,
        tokens: tokensCommand
    };

    // todo: Move commands into a separate directive
    var command = function (text) {
        var command = commands[text];
        if (command) {
            command();
        } else {
            storyLog.error("Sorry... unknown command : " + text);
        }
    };

    // todo: Move hotkey into a separate directive
    hotkeys.add({
        combo: 'ctrl+1',
        description: 'Output the current state',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("state");
        }
    });
    hotkeys.add({
        combo: 'ctrl+2',
        description: 'Output the execution tree',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tree");
        }
    });
    hotkeys.add({
        combo: 'ctrl+3',
        description: 'Outputing script parsing',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
            command("tokens");
        }
    });

    //todo: Create a class for commands

    function stateCommand() {
        var html = game.state.html();
        storyLog.debug("Outputing current game state:");
        storyLog.debug(html);
    }

    function treeCommand() {
        var html = game.script.ast.html();
        storyLog.debug("Outputing execution tree:");
        storyLog.debug(html);
    }

    function tokensCommand() {
        var html = game.script.pointer.html();
        storyLog.debug("Outputing script parsing:");
        storyLog.debug(html);
    }

    function moveCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "move");
    }

    function takeCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "take");
    }

    function lookCommand() {
        var isAboutTo = game.state.predicate("isAboutTo");
        state.thing("You").setAssertion(isAboutTo, "look");
    }

    function inventoryCommand() {
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

    return {
        command: command
    };

}



