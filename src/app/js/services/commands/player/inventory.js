angular.module('yarn').factory('inventoryPlayerCommand', inventoryPlayerCommand);

function inventoryPlayerCommand(game,
                          storyLogService) {

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
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            storyLogService.log(message.join(""));
        } else {
            storyLogService.error("You have nothing in inventory!");
        }
    }

    return {
        name: "playerInventory",
        shortDescription: "Trigger the player's <strong>inventory</strong> command",
        longDescription:
            "Trigger the player's <strong>inventory</strong> command. Same as if the player had" +
            "click the <strong>inventory</strong> button.<br/>",
        handler: handler
    };

}