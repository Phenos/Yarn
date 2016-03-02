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
                var isUsableItem = false;

                var thingsThatAre = state.resolveAll({
                    subject: thing.id,
                    predicate: "isA"
                });
                var usableItem = state.thing("Usable");
                thingsThatAre.forEach(function (thing) {
                    if (thing === usableItem) isUsableItem = true;
                });
                if (isUsableItem) foundUsableItems.push(thing);
            });
        }

        return foundUsableItems;
    }

});