angular.module('yarn').factory('inventoryPlayerCommand', inventoryPlayerCommand);

function inventoryPlayerCommand(game,
                          storyLogService) {

    return function inventoryCommand() {
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

}