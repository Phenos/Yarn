yarn.service("inventoryRoutine", function (events,
                                           writers,
                                           assert,
                                           state,
                                           storyLog,
                                           stateHelpers,
                                           stepRoutine) {

    function inventoryRoutine() {
        var phrase = [];

        storyLog.action("You look at your inventory");

        var inventory = stateHelpers.ownInventory();


        if (inventory.length === 0) {
            var defaultText = state.resolveValue(assert("Default", "for", "YouHaveNothing"));
            storyLog.log(defaultText || "You have nothing");

        } else {

            phrase.push("You have a ");
            angular.forEach(inventory, function (thing, index) {
                var thingName = state.resolveValue(assert(thing, "has", "Name"));
                thingName = thingName || thing.id;
                phrase.push("[" + thingName + "]");
                if (index < inventory.length) {
                    phrase.push(", ")
                } else {
                    phrase.push(".")
                }
            });

            storyLog.log(phrase.join(""));

        }

        events.trigger(assert("You", "have looked at", "Inventory"));

        stepRoutine();

        return true;
    }

    return inventoryRoutine;

});


