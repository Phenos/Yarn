yarn.service("takeRoutine", function (state,
                                      events,
                                      assert,
                                      predicates,
                                      storyLog,
                                      things,
                                      writers) {

    function takeRoutine(object) {
        if (object) {
            var hasInInventory = predicates("hasInInventory");
            var you = things.get("Player");

            // Put item in inventory and log it to the player
            state.createAssertion(you, hasInInventory, object);
            writers.describeThingTakenInInventory(object);
        }
        return true;
    }

    return takeRoutine;

});