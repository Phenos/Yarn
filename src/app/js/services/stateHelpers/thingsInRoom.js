yarn.service("thingsInRoomHelper", function (state) {

    return function thingsInRoom(room) {
        var foundThings = [];

        if (room) {

            var thingsInRoom = state.resolveAll({
                predicate: "isIn",
                object: room.id
            });

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isThing = state.resolveValue({
                    subject: thing.id,
                    predicate: "is",
                    object: "Thing"
                });
                //console.log("thingsThatAre", thingsThatAre, thing.id);
                if (isThing) foundThings.push(thing);
            });
        }

        return foundThings;
    };

});