//todo: refactor to share code with inventoryInRoomHelper
yarn.service("thingsInRoomHelper", function (state) {

    return function thingsInRoom(room) {
        var foundInventory = [];

        if (room) {

            var thingsInRoom = state.resolveAll({
                predicate: "isIn",
                object: room.id
            });
            //console.log("thingsInRoom", thingsInRoom);

            // Todo: YUCK... Find a better way to do these checks!!!!!
            thingsInRoom.forEach(function (thing) {
                // Check if item is an InventoryItem
                var isThing = false;

                var thingsThatAre = state.resolveAll({
                    subject: thing.id,
                    predicate: "is"
                });
                //console.log("thingsThatAre", thingsThatAre, thing.id);

                var Thing = state.thing("Thing");
                thingsThatAre.forEach(function (thing) {
                    if (thing === Thing) isThing = true;
                });
                if (isThing) foundInventory.push(thing);
            });
        }

        return foundInventory;
    };

});