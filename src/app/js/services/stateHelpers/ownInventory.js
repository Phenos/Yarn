yarn.service("ownInventoryHelper", function (state,
                                             assert) {

    return function ownInventory() {
        var foundInventory = [];

        var undef = void 0;
        var thingsInInventory = state.resolveAll(assert(undef, "is in", "Your Inventory"));

//        console.log("thingsInInventory", thingsInInventory);

        thingsInInventory.forEach(function (thing) {
            foundInventory.push(thing);
        });

        return foundInventory;
    }

});