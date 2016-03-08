yarn.service("thingsInRoomHelper", function (state,
                                             assert) {

    return function thingsInRoom(room) {
        var foundThings = [];

        if (room) {
            var thingsInRoom = state.resolveAll(assert(undefined, "is in", room));

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isThing = state.resolveValue(assert(thing, "is", "Thing"));
                //console.log("thingsThatAre", thingsThatAre, thing.id);
                if (isThing) foundThings.push(thing);
            });
        }

        return foundThings;
    };

});