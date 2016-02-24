// LEGACY CODE FOR ELECTRON
//if (typeof require !== "undefined") {
//    var remote = require('remote');
//}

yarn.factory('commands', commands);
yarn.factory('commandsRegistry', commandsRegistry);

function commands(yConsole,
                  commandsRegistry) {

    var command = function (text) {
        var args = text.split(" ");
        var commandStr = args.shift();
        var command = commandsRegistry.match(commandStr);
        if (command) {
            yConsole.command(text);
            command.handler(text, args);
        } else {
            yConsole.error("Unknown command : " + text);
            yConsole.tip("Use the <srong>help</srong> to see a list of available commands");
        }
    };

    return {
        command: command
    };

}

function commandsRegistry(hotkeys,
                          $injector) {
    var service = {};

    service.commands = [];

    service.register = function (command) {
        service.commands.push(command);

        if (command.keystroke) {
            hotkeys.add({
                combo: command.keystroke,
                description: command.shortDescription,
                callback: function () {
                    command.handler(command.name);
                }
            });
        }

    };

    service.match = function (commandName) {
        var match = null;

        angular.forEach(service.commands, function (command) {
            if (command.name === commandName) match = command;
        });

        return match;
    };

    service.load = function (commands) {
        //console.log("Loading commands into command registry", commands);
        angular.forEach(commands, function (commandName) {
            var command = $injector.get(commandName);
            service.register(command);
        });
    };

    return service;
}

