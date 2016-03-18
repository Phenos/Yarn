yarn.service("thingsInRoomHelper", function (state,
                                             assert) {

    return function thingsInRoom(room) {
        var foundThings = [];

        if (room) {
            var thingsInRoom = state.resolveAll(assert(undefined, "is in", room));

            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isThing = state.resolveValue(assert(thing, "is", "Thing"));
                var isScenery = state.resolveValue(assert(thing, "is", "Scenery"));
                //console.log("thingsThatAre", thingsThatAre, thing.id);
                if (isThing || isScenery) foundThings.push(thing);
            });
        }

        return foundThings;
    };

});