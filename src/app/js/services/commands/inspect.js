angular.module('yarn').factory('inspectCommand', inspectCommand);

function inspectCommand($localStorage,
                        yConsole,
                        consoleHelper,
                        game) {

    var inspectionItems = {
        "object": {
            name: "[object]",
            description: "Inspect a game object.",
            handler: inspectObject
        }
    };

    function getInspectableItemsDescriptions() {
        // Create a string of clearable items
        var inspectablleItemsDescriptions = [];

        angular.forEach(inspectionItems, function (item) {
            inspectablleItemsDescriptions.push("<span command>inspect " + item.name + "</span> : " + item.description + "<br/>");
        });

        return inspectablleItemsDescriptions.join("");
    }

    function handler(command, args) {
        if (!args || args.length === 0) {
            yConsole.tip(
                "Here is the list of things you can inspect:<br/>" +
                getInspectableItemsDescriptions()
            );
        } else if (args.length > 0) {
            inspectItems(args)
        }
        console.log(game.state);
    }

    function inspectItems(items) {
        angular.forEach(items, function (_itemName) {
            var item;
            var assertions;
            var log = [];
            var itemName = _itemName.toLowerCase();

            var thing = game.state.thing(itemName);
            if (thing) {

                // TODO: Add argument to ALSO output assertions that have been negated
                // Currently only the "true" assertions are shown

                assertions = game.state.getAssertions(thing);
                assertions = assertions.filter(function (assertion) {
                    return !assertion.isUniqueAndFalse();
                });

                log.push("The object <span command='inspect " + thing.id + "'>" + thing.id + "</span> has ");

                if (assertions.length === 0) {
                    log.push("no assertions.");
                } else {
                    log.push(assertions.length + " assertions:<br/>");
                }

                angular.forEach(assertions, function (assertion) {
                    log.push(consoleHelper.assertion2log(assertion) + "<br/>");
                });

                if (thing.childStates.length) {
                    log.push("<strong>Has " + thing.childStates.length + " child assertions:</strong><br/>");
                    angular.forEach(thing.childStates, function (state) {
                        log.push(
                            "&nbsp;&nbsp;&nbsp;&nbsp;" +
                            consoleHelper.assertion2log(state.assertion, thing) +
                            "<br/>")
                    });
                }

                yConsole.log(log.join(""));

            } else {
                item = inspectionItems[itemName];
                if (item) {
                    item.handler();
                } else {
                    yConsole.error("[" + itemName + "] is not something that can be inspected.");
                }
            }
        });
    }

    function inspectObject() {

    }


    return {
        name: "inspect",
        shortDescription: "Inspect various aspect of the game state.",
        longDescription: "Use the <span command>inspect</span> command to view information about the internal" +
        "state of the game. This command is essential for debugging your story when it does dot behave as" +
        " you wished.<br/><br/>" +
        "Enter the <span command>inspect</span> command alone to get a list of inspectable items.<br/>",
        handler: handler
    };

}