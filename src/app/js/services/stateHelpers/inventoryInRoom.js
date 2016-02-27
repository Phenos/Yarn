yarn.service("inventoryInRoomHelper", function (state) {

    return function inventoryInRoom(room) {
        var foundInventory = [];

        var isIn = state.predicate("isIn");
        var thingsInRoomAssertions = state.getAssertions(null, isIn, room);
        //console.log("thingsInRoomAssertions", isIn, room, thingsInRoomAssertions);
        var thingsInRoom = [];
        angular.forEach(thingsInRoomAssertions, function (assertion) {
            if (assertion.value())
                thingsInRoom.push(assertion.subject);
        });

        // Todo: YUCK... Find a better way to do these checks!!!!!
        thingsInRoom.forEach(function (thing) {
            // Check if item is an InventoryItem
            var isInventoryItem = false;
            var thingsThatAre = thing.resolve("isA");
            thingsThatAre.forEach(function (thing) {
                if (thing === state.thing("InventoryItem")) isInventoryItem = true;
            });
            if (isInventoryItem) foundInventory.push(thing);
        });

        return foundInventory;
    }

});