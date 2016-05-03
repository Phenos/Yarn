yarn.factory('inventoryPlayerCommand', inventoryPlayerCommand);

function inventoryPlayerCommand(state,
                                assert,
                                transcript,
                                promptLoop) {

    function handler() {
        var itemList;

        var thingsInInventory = state.resolveAll(assert("Player", "have in inventory"));

        if (thingsInInventory.length) {
            itemList = [];
            thingsInInventory.forEach(function (thing) {
                var name = state.resolveValue(assert(thing, "has", "Name"));
                itemList.push(name);
            });
            var message = [
                "You have ",
                thingsInInventory.length,
                " item in inventory: <a href='#'>",
                itemList.join("</a>, <a href='#'>"),
                "</a>."
            ];
            transcript.log(message.join(""));
        } else {
            transcript.error("You have nothing in inventory!");
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