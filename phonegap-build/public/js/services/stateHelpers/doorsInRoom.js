yarn.service("doorsInRoomHelper", function (state,
                                             assert) {

    return function doorsInRoom(room) {
        var foundDoors = [];

        if (room) {
            var doorsInRoom = state.resolveAll(assert(undefined, "is in", room));
            doorsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isDoor = state.resolveValue(assert(thing, "is", "Exit"));
                //console.log("thingsThatAre", thingsThatAre, thing.id);
                if (isDoor) foundDoors.push(thing);
            });

            //var exitsInRoom = state.resolveAll(assert(room, "links to"));
            //
            //exitsInRoom.forEach(function (thing) {
            //    // Check if item is an InventoryItem
            //    var isRoom = state.resolveValue(assert(thing, "is", "Room"));
            //    //console.log("thingsThatAre", thingsThatAre, thing.id);
            //    if (isRoom) foundDoors.push(thing);
            //});
        }

        return foundDoors;
    };

});