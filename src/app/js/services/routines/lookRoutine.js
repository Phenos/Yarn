yarn.service("lookRoutine", function (events,
                                      writers,
                                      assert,
                                      stepRoutine) {

    function lookRoutine(object) {
        if (object) {
            writers.describeThing(object);
            writers.objectMenu(object);
            events.trigger(assert("You", "have looked at", object));
            stepRoutine();
        }
        return true;
    }

    return lookRoutine;

});


