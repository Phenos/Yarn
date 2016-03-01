yarn.factory('inventoryPlayerCommand', inventoryPlayerCommand);

function inventoryPlayerCommand(state,
                                storyLog,
                                promptLoop) {

    function handler() {
        var itemList;

        var thingsInInventory = state.resolveAll({
            subject: "you",
            predicate: "hasInInventory"
        });

        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var label = state.resolveOne({
                    subject: thing.id,
                    predicate: "isNamed"
                });
                itemList.push(label);
            });
            var message = [
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            storyLog.log(message.join(""));
        } else {
            storyLog.error("You have nothing in inventory!");
        }

        promptLoop.update();
    }

    return {
        name: "playerInventory",
        shortDescription: "Trigger the player's <strong>inventory</strong> command",
        longDescription: "Trigger the player's <strong>inventory</strong> command. Same as if the player had" +
        "click the <strong>inventory</strong> button.<br/>",
        handler: handler
    };

}