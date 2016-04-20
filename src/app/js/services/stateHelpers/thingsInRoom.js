yarn.service("thingsInRoomHelper", function (state,
                                             assert) {

    return function thingsInRoom(space) {
        var foundThings = [];

        if (space) {
            var undef = void 0;
            var things = state.resolveAll(assert(undef, "is in", space));
//            console.log("thingsInRoom", thingsInRoom);
            things.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isThing = state.resolveValue(assert(thing, "is", "Thing"));
                if (isThing) {
                    foundThings.push(thing);
                }
            });
        }

        return foundThings;
    };

});