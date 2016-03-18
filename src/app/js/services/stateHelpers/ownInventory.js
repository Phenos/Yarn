yarn.service("ownInventoryHelper", function (state,
                                             assert) {

    return function ownInventory() {
        var foundInventory = [];

        var thingsInInventory = state.resolveAll(assert(undefined, "is in", "YourInventory"));

        console.log("thingsInInventory", thingsInInventory);

        thingsInInventory.forEach(function (thing) {
            foundInventory.push(thing);
        });

        return foundInventory;
    }

});