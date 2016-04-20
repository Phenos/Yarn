yarn.service("takeRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      storyLog,
                                      things,
                                      writers) {

    events.on("Player takes *", "after dialogs", function () {
        var object = state.one("Player takes *");
        takeRoutine(object);
        state.negate(assert("Player", "take"));
    });

    function takeRoutine(object) {
        if (object) {

            // Log the action of the player
            var thingName = state.resolveValue(assert(object, "has", "Name"));
            if (thingName) {
                storyLog.action("You take the " + thingName);
            } else {
                storyLog.action("You take the object");
            }

            // Remove the object from where it was
            var isAlreadyIn = state.one("Object is in *", {
                Object: object
            });
            if (isAlreadyIn) {
                state.negate(assert(object, "is in", isAlreadyIn));
            }

            // Put item in inventory and log it to the player
            var YourInventory = things.get("Your Inventory");
            var isIn = predicates("Is In");
            state.createAssertion(object, isIn, YourInventory);
        }
        return true;
    }

    return takeRoutine;

});