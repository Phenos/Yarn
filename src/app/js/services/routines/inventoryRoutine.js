yarn.service("inventoryRoutine", function (events,
                                           writers,
                                           assert,
                                           state,
                                           storyLog,
                                           stateHelpers) {

    // Process movement triggered by creating an assertion
    events.on("Player did Look At Inventory", "after events", function () {
        inventoryRoutine();
    });

    function inventoryRoutine() {
        var phrase = [];

        storyLog.action("You look at your inventory");

        var inventory = stateHelpers.ownInventory();


        if (inventory.length === 0) {
            var defaultText = state.resolveValue(assert("Default", "for", "YouHaveNothing"));
            storyLog.log(defaultText || "You have nothing");

        } else {

            phrase.push("Player has a ");
            angular.forEach(inventory, function (thing, index) {
                var thingName = state.resolveValue(assert(thing, "has", "Name"));
                thingName = thingName || thing.id;
                phrase.push("[" + thingName + ":" + thing.id +  "]");
                if (index === inventory.length - 1) {
                    phrase.push(".")
                } else if (index === inventory.length - 2) {
                    phrase.push(" and a ");
                } else {
                    phrase.push(", ")
                }
            });

            storyLog.log(phrase.join(""));

        }

        events.trigger(assert("Player", "has looked at", "Inventory"));

        return true;
    }

    return inventoryRoutine;

});


