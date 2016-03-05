yarn.service("useRoutine", function (state,
                                     events,
                                     stepRoutine) {

    return function useRoutine(object) {
        var subject = state.thing("You");
        var use = state.predicate("use");
        events.trigger(subject, use, object);
        var somethingHappened = stepRoutine();

        return somethingHappened;
    }

});

