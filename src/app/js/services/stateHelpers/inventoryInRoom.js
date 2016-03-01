yarn.service("inventoryInRoomHelper", function (state) {

    return function inventoryInRoom(room) {
        var foundInventory = [];

        if (room) {

            var thingsInRoom = state.resolveAll({
                predicate: "isIn",
                object: room.id
            });

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isInventoryItem = false;

                var thingsThatAre = state.resolveAll({
                    subject: thing.id,
                    predicate: "isA"
                });
                var inventoryItem = state.thing("InventoryItem");
                thingsThatAre.forEach(function (thing) {
                    if (thing === inventoryItem) isInventoryItem = true;
                });
                if (isInventoryItem) foundInventory.push(thing);
            });
        }

        return foundInventory;
    }

});