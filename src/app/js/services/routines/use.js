yarn.service("useRoutine", function (state,
                                     events,
                                     stepRoutine) {

    return function useRoutine(object) {
        // todo: first test if the object is usable
        var subject = state.thing("You");
        var use = state.predicate("use");
        events.trigger(subject, use, object);
        var somethingHappened = stepRoutine();

        return somethingHappened;
    }

});

