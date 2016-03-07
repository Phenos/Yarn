yarn.service("takeRoutine", function (state,
                                      events,
                                      assert,
                                      stepRoutine,
                                      writers) {

/*


    TODO: MAKE THIS AS SEXY AS POSSILE


*/


    function takeRoutine(object) {
        if (object) {
            var hasInInventory = state.predicate("hasInInventory");
            var isIn = state.predicate("isIn");
            var you = state.thing("You");

            // Put item in inventory and log it to the player
            state.createAssertion(you, hasInInventory, object);
            writers.describeThingTakenInInventory(object);

            state.negate({
                subject: object.id,
                predicate: "isIn"
            });

            events.trigger(assert("you", "take", object));

            stepRoutine();
        }
        return true;
    }

    return takeRoutine;

});

