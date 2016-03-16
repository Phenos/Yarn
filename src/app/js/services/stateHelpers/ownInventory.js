yarn.service("ownInventoryHelper", function (state,
                                             assert) {

    return function ownInventory() {
        var foundInventory = [];

        var thingsInInventory = state.resolveAll(assert("You", "have in inventory"));

        console.log("thingsInInventory", thingsInInventory);

        thingsInInventory.forEach(function (thing) {
            foundInventory.push(thing);
        });

        return foundInventory;
    }

});