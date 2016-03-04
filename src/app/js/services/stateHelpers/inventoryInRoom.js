yarn.service("inventoryInRoomHelper", function (state) {

    return function inventoryInRoom(room) {
        var foundInventory = [];

        if (room) {

            var thingsInRoom = state.resolveAll({
                predicate: "isIn",
                object: room.id
            });

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isInventoryItem = state.resolveValue({
                    subject: thing.id,
                    predicate: "isA",
                    object: "InventoryItem"
                });
                if (isInventoryItem) foundInventory.push(thing);
            });
        }

        return foundInventory;
    }

});