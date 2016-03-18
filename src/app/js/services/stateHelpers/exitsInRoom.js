yarn.service("exitsInRoomHelper", function (state,
                                             assert) {

    return function exitsInRoom(room) {
        var foundRooms = [];

        if (room) {
            var exitsInRoom = state.resolveAll(assert(room, "links to"));

            exitsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isRoom = state.resolveValue(assert(thing, "is", "Room"));
                //console.log("thingsThatAre", thingsThatAre, thing.id);
                if (isRoom) foundRooms.push(thing);
            });
        }

        return foundRooms;
    };

});