yarn.service("takeRoutine", function (state,
                                      events,
                                      stepRoutine,
                                      writers) {

    function takeRoutine(object) {
        if (object) {
            var hasInInventory = state.predicate("hasInInventory");
            var isIn = state.predicate("isIn");
            var you = state.thing("You");
            you.createAssertion(hasInInventory, object);

            // Put item in inventory and log it to the player
            you.createAssertion(hasInInventory, object);
            writers.describeThingTakenInInventory(object);

            var wasInAssertions = state.assertions.find({
                subject: object,
                predicate: isIn
            });
            console.log("wasInAssertions", wasInAssertions);
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

