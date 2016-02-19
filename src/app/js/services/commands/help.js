(function () {

    angular.module('yarn').factory('helpCommand', command);

    function command(yConsole, commandsRegistry) {

        function handler(commandName, args) {

            if (!args || !args.length === 0) {
                genericHelp();
            } else if (args.length === 1) {
                if (args[0] === "all") {
                    verboseHelp();
                } else {
                    specificHelp(args[0]);
                }
            } else if (args.length > 1) {
                yConsole.error("Invalid number of arguments");
            }
        }

        function specificHelp(commandName) {
            var command = commandsRegistry.match(commandName);
            if (command) {
                yConsole.log(
                    "<strong>" + command.name + " command</strong><br/><br/>" +
                    command.longDescription
                );
            } else {
                yConsole.log("Sorry, there is no command called <strong>" + commandName + "</strong>");
            }
        }

        function genericHelp() {
            var commandsList = [];
            angular.forEach(commandsRegistry.commands, function (command) {
                commandsList.push(command.name);
            });

            yConsole.log(
                "You can user the following command from this console: <br/>" +
                commandsList.join(",")
            );
        }
        function verboseHelp() {
            var commandsList = [];
            angular.forEach(commandsRegistry.commands, function (command) {
                commandsList.push("<strong>" + command.name + "</strong> : " + command.shortDescription);
            });

            yConsole.log(
                "You can user the following command from this console: <br/>" +
                commandsList.join("<br/>")
            );
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
})();
