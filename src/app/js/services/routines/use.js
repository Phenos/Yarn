yarn.service("useRoutine", function (assert,
                                     events,
                                     stepRoutine) {

    return function useRoutine(object) {
        events.trigger(assert("Player", "use", object));
        var somethingHappened = stepRoutine();
        return somethingHappened;
    }

});

