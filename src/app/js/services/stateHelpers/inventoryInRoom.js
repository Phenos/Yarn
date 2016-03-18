yarn.service("inventoryInRoomHelper", function (state,
                                                assert) {

    return function inventoryInRoom(room) {
        var foundInventory = [];

        if (room) {

            var thingsInRoom = state.resolveAll(assert(undefined, "is in", room));

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isInventoryItem = state.resolveValue(assert(thing, "is", "InventoryItem"));
                if (isInventoryItem) foundInventory.push(thing);
            });
        }

        return foundInventory;
    }

});