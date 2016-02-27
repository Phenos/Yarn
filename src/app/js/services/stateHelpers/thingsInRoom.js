//todo: refactor to share code with inventoryInRoomHelper
yarn.service("thingsInRoomHelper", function (state) {

    return function thingsInRoom(room) {
        var foundThings = [];

        var isIn = state.predicate("isIn");
        var thingsInRoomAssertions = state.getAssertions(null, isIn, room);
        //console.log("thingsInRoomAssertions", isIn, room, thingsInRoomAssertions);
        var thingsInRoom = [];
        angular.forEach(thingsInRoomAssertions, function (assertion) {
            if (assertion.value())
                thingsInRoom.push(assertion.subject);
        });

        angular.forEach(thingsInRoom, function (thing) {
            // Check if item is an InventoryItem
            var isAThing = false;
            var thingsThatAre = thing.resolve("isA");
            thingsThatAre.forEach(function (thing) {
                if (thing === state.thing("Thing")) {
                    isAThing = true;
                }
            });
            if (isAThing) foundThings.push(thing);
        });

        return foundThings;
    }

});