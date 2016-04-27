yarn.service('clearCommand', clearCommand);

function clearCommand(storyLocalStorage,
                      yConsole,
                      state) {

    var clearableItems = {
        "session": {
            name: "session",
            description: "Clear the current player session from the game state.",
            handler: clearSession
        },
        "code": {
            name: "code",
            description: "Clear the code state, without clearing the game session state.",
            handler: clearCode
        },
        "localstorage": {
            name: "localstorage",
            description: "Clear the localStorage from the browser.",
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

    function handler(args) {
        if (!args || args.length === 0) {
            yConsole.tip(
                "Here is the list of things you can clear:<br/>" +
                getClearableItemsDescriptions()
            );
        } else if (args.length > 0) {
            clearItems(args)
        }
    }

    function clearItems(items) {
        angular.forEach(items, function (_itemName) {
            var itemName = _itemName.toLowerCase();
            var item = clearableItems[itemName];
            if (item) {
                item.handler();
            } else {
                yConsole.error("[" + itemName + "] is not something that can be cleared from memory.");
            }
        });
    }

    function clearLocalStorage() {
        //delete $localStorage.localState;

        // Clear the assertions from localStorage
        var storyStorage = storyLocalStorage.get();
        storyStorage.assertions = {};

        yConsole.success("Local storage memory cleared.");
    }

    function clearSession() {
        state.assertions.removeLayer('session');
        yConsole.success("Game session is clear. Story is back at beginning.");
    }

    function clearCode() {
        state.assertions.removeLayer('code');
        yConsole.success("Source code state is cleared.");
    }

    function clearAll() {
        clearItems([
            "code",
            "session",
            "localstorage"
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