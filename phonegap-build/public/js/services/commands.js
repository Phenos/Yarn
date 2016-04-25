yarn.service('commands', function (yConsole,
                                   hotkeys,
                                   $injector) {

    function Commands() {
        this.all = [];
    }

    Commands.prototype.run = function (textOrCommand) {
        var text;
        if (angular.isString(textOrCommand)) {
            text = textOrCommand;
        } else {
            text = textOrCommand.name;
        }
        var args = text.split(" ");
        var commandStr = args.shift();
        var command = this.match(commandStr);
        if (command) {
            yConsole.command(text);
            command.handler(args, text);
        } else {
            yConsole.error("Unknown command : " + text);
            yConsole.tip("Use the <srong>help</srong> to see a list of available commands");
        }
    };

    Commands.prototype.add = function (command) {
        this.all.push(command);

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

    Commands.prototype.match = function (commandName) {
        var match = null;

        angular.forEach(this.all, function (command) {
            if (command.name === commandName) match = command;
        });

        return match;
    };

    Commands.prototype.load = function (commands) {
        var self = this;
        //console.log("Loading commands into command registry", commands);
        angular.forEach(commands, function (commandName) {
            var command = $injector.get(commandName);
            self.add(command);
        });
    };


    return new Commands();

});

