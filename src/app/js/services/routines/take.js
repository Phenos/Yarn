yarn.service("takeRoutine", function (state,
                                      events,
                                      stepRoutine,
                                      assert,
                                      predicates,
                                      storyLog,
                                      things,
                                      writers) {
    function takeRoutine(object) {
        if (object) {
            var hasInInventory = predicates("hasInInventory");
            var you = things("You");

            // Put item in inventory and log it to the player
            state.createAssertion(you, hasInInventory, object);
            writers.describeThingTakenInInventory(object);

            stepRoutine();
        }
        return true;
    }

    return takeRoutine;

});