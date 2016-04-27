yarn.service("inventoryInRoomHelper", function (state,
                                                assert) {

    return function inventoryInRoom(room) {
        var foundInventory = [];

        if (room) {

            var undef = 0;
            var thingsInRoom = state.resolveAll(assert(undef, "is in", room));

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isInventoryItem = state.resolveValue(assert(thing, "is", "Inventory Item"));
                if (isInventoryItem){
                    foundInventory.push(thing);
                }
            });
        }

        return foundInventory;
    }

});