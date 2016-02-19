angular.module('yarn').factory('inventoryCommand', inventoryCommand);

function inventoryCommand(yConsole,
                          game) {

    function handler() {
        var itemList;
        var thingsInInventory = game.state.resolve("You.hasInInventory");

        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var label = thing.resolveValue("isNamed");
                itemList.push(label);
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