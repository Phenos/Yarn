yarn.factory('inspectCommand', inspectCommand);

function inspectCommand(state,
                        things,
                        assert,
                        yConsole,
                        consoleHelper) {

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

    function handler(args) {
        if (!args || args.length === 0) {
            yConsole.tip(
                "Here is the list of things you can inspect:<br/>" +
                getInspectableItemsDescriptions()
            );
        } else if (args.length > 0) {
            inspectItems(args)
        }
    }

    function inspectItems(items) {
        angular.forEach(items, function (_itemName) {
            var item;
            var assertions;
            var log = [];
            var itemName = _itemName.toLowerCase();

            var thing = things(itemName);
            if (thing) {

                assertions = state.assertions.find(assert(thing, undefined, undefined, {
                    parent: null
                }));

                log.push("The object <span command='inspect " + thing.id + "'>" + thing.id + "</span> has ");

                if (assertions.length === 0) {
                    log.push("no assertions.");
                } else {
                    log.push(assertions.length + " assertions:<br/>");
                }

                angular.forEach(assertions, function (assertion) {
                    log.push(consoleHelper.assertion2log(assertion) + "<br/>");
                });
/*
                var childAssertions = state.assertions.find(assert(undefined, undefined, undefined, {
                    parent: thing
                }));

                if (childAssertions.length) {
                    log.push("<strong>Has " + childAssertions.length + " child assertions:</strong><br/>");
                    angular.forEach(childAssertions, function (assertion) {
                        log.push(
                            "&nbsp;&nbsp;&nbsp;&nbsp;" +
                            consoleHelper.assertion2log(assertion, thing) +
                            "<br/>")
                    });
                }
*/
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
