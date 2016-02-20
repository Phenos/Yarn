angular.module('yarn').factory('clearCommand', clearCommand);

function clearCommand($localStorage,
                      yConsole,
                      game) {

    var clearableItems = {
        "localstorage": {
            name: "localstorage",
            description: "Clear the localStorage from the browser",
            handler: clearLocalStorage
        },
        "all": {
            name: "all",
            description: "Clear all clearable thing. Wipe everything from memory!",
            handler: clearAll
        }
    };

    function getClearableItemsDescriptions() {
        // Create a string of clearable items
        var clearableItemsDescriptions = [];

        angular.forEach(clearableItems, function (item) {
            clearableItemsDescriptions.push("<span command>clear " + item.name + "</span> : " + item.description + "<br/>");
        });

        return clearableItemsDescriptions.join("");
    }

    function handler(command, args) {
        if (!args || args.length === 0) {
            yConsole.hint(
                "Here is the list of things you can clear:<br/>" +
                getClearableItemsDescriptions()
            );
        } else if (args.length > 0) {
            clearItems(args)
        }
        console.log(game.state);
    }

    function clearItems(items) {
        angular.forEach(items, function (item) {
            var handler = clearableItems[item];
            if (handler) {
                handler();
            } else {
                yConsole.error("[" + item + "] is not something that can be cleared from memory.");
            }
        });
    }

    function clearLocalStorage() {
        $localStorage.$reset();
        yConsole.success("Local storage memory cleared.");
    }

    function clearAll() {
        clearItems([
            "localStrorage"
        ]);
    }


    return {
        name: "clear",
        shortDescription: "Clear game state, save games or other such data.",
        longDescription: "Use the clear command to clear all kinds of things from memory.<br/>" +
        "Enter the <span command>clear</span> command alone to obtain a list of clearable items.<br/>",
        handler: handler
    };

}