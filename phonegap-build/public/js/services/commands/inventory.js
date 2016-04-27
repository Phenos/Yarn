yarn.factory('inventoryCommand', inventoryCommand);

function inventoryCommand(yConsole,
                          assert,
                          state) {

    function handler() {
        var itemList;

        var thingsInInventory = state.resolveAll(assert("Player", "has in inventory"));

        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var name = state.resolveValue(assert(thing, "has", "Name"));
                itemList.push(name);
            });
            var message = [
                "The player has ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            yConsole.log(message.join(""));
        } else {
            yConsole.error("The player has nothing in inventory!");
        }
    }

    return {
        name: "inventory",
        shortDescription: "Show the players inventory",
        longDescription:
        "Obtain a list of all objects currently in the players inventory.",
        handler: handler
    }

}