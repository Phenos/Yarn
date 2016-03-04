yarn.service("usableItemInRoomHelper", function (state) {

    return function usableItemInRoom(room) {
        var foundUsableItems = [];

        if (room) {

            var thingsInRoom = state.resolveAll({
                predicate: "isIn",
                object: room.id
            });

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var thingIsUsable = state.resolveValue({
                    subject: thing.id,
                    predicate: "is",
                    object: "Usable"
                });

                if (thingIsUsable) foundUsableItems.push(thing);
            });
        }

        return foundUsableItems;
    }

});