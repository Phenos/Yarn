yarn.service("useRoutine", function (assert,
                                     events,
                                     step) {

    return function useRoutine(object) {
        events.trigger(assert("Player", "use", object));
        step();
    }

});

