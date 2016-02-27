yarn.service("takeRoutine", function (state,
                                      events,
                                      stepRoutine,
                                      writers) {

    function takeRoutine(object) {
        /*

         state.thing("You").setAssertion(hasInInventory, object);

         */
        if (object) {
            var hasInInventory = state.predicate("hasInInventory");
            var isIn = state.predicate("isIn");
            var you = state.thing("You");
            you.setAssertion(hasInInventory, object);

            // Put item in inventory and log it to the player
            you.setAssertion(hasInInventory, object);
            writers.describeThingTakenInInventory(object);

            var wasInAssertions = state.getAssertions(object, isIn);
            angular.forEach(wasInAssertions, function (assertion) {
                state.negate(assertion);
            });

            var take = state.predicate("take");
            events.trigger(you, take, object);

            stepRoutine();
        }
        return true;
    }

    return takeRoutine;

});

