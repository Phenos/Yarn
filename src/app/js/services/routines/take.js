yarn.service("takeRoutine", function (state,
                                      events,
                                      stepRoutine) {

    function takeRoutine(object) {
        /*

         state.thing("You").setAssertion(hasInInventory, object);
         writers.describeThingTakenInInventory(thing);

         */
        if (object) {
            var hasInInventory = state.predicate("hasInInventory");
            var isIn = state.predicate("isIn");
            var you = state.thing("You");
            you.setAssertion(hasInInventory, object);

            // todo: Remove the object from it's original location

            you.setAssertion(hasInInventory, object);

            var take = state.predicate("take");
            events.trigger(you, take, object);

            stepRoutine();
        }
        return true;
    }

    return takeRoutine;

});

