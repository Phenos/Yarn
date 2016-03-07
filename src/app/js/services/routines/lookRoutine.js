yarn.service("lookRoutine", function (state,
                                      events,
                                      writers,
                                      stepRoutine) {

    function lookRoutine(object) {
        if (object) {
            writers.describeThing(object);

            // todo: Refactor these 3 lines into a single line
            var you = state.thing("You");
            var hasLookedAt = state.predicate("hasLookedAt");
            events.trigger(you, hasLookedAt, object);

            stepRoutine();
        }
        return true;
    }

    return lookRoutine;

});


