yarn.service("takeRoutine", function (state,
                                      events,
                                      stepRoutine,
                                      assert,
                                      predicates,
                                      things,
                                      writers) {
    function takeRoutine(object) {
        if (object) {
            var hasInInventory = predicates("hasInInventory");
            var you = things("You");

            // Put item in inventory and log it to the player
            state.createAssertion(you, hasInInventory, object);
            writers.describeThingTakenInInventory(object);

            state.negate(assert(object, "is in"));
            events.trigger(assert("you", "take", object));

            stepRoutine();
        }
        return true;
    }

    return takeRoutine;

});