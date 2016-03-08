yarn.service("usableItemInRoomHelper", function (state,
                                                 assert) {

    return function usableItemInRoom(room) {
        var foundUsableItems = [];

        if (room) {

            var thingsInRoom = state.resolveAll(assert(undefined, "is in", room));

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isUsable = state.resolveValue(assert(thing, "is", "Usable"));
                if (isUsable) foundUsableItems.push(thing);
            });
        }

        return foundUsableItems;
    }

});