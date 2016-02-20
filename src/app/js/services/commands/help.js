(function () {

    angular.module('yarn').factory('helpCommand', command);

    function command(yConsole, commandsRegistry) {

        function handler(commandName, args) {

            if (!args || args.length === 0) {
                genericHelp();
            } else if (args.length === 1) {
                if (args[0] === "all") {
                    verboseHelp();
                } else {
                    specificHelp(args[0]);
                }
            } else if (args.length > 1) {
                yConsole.error("Invalid number of arguments.");
                yConsole.tip("The help command takes a single argument, which is the name of another command.");
            }
        }

        function specificHelp(commandName) {
            var command = commandsRegistry.match(commandName);
            if (command) {
                yConsole.log(
                    "<span command>" + command.name + "</span><strong>command</strong><br/><br/>" +
                    command.longDescription
                );
            } else {
                yConsole.log("Sorry, there is no command called <strong>" + commandName + "</strong>");
            }
        }

        function genericHelp() {
            var commandsList = [];
            angular.forEach(commandsRegistry.commands, function (command) {
                commandsList.push("<span command>" + command.name + "</span>");
            });

            yConsole.log(
                "You can user the following command from this console: <br/>" +
                commandsList.join(", ")
            );
        }
        function verboseHelp() {
            var commandsList = [];
            angular.forEach(commandsRegistry.commands, function (command) {
                commandsList.push("<span command>" + command.name + "</span> : " + command.shortDescription);
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
                "Ex.: <span command>help inventory</span>",
            autocompletePreview: "<span command>help</span> | help <em>someCommand</em> | <span command>help all</span>",
            autocompleteText: "help ",
            handler: handler
        };

    }
})();
