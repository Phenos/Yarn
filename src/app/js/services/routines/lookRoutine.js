yarn.service("lookRoutine", function (events,
                                      writers,
                                      assert,
                                      state,
                                      storyLog,
                                      stepRoutine) {

    function lookRoutine(object) {
        if (object) {

            var thingName = state.resolveValue(assert(object, "has", "Name"));
            thingName = thingName || object.id;
            storyLog.action("You examine the " + thingName);

            writers.describeThing(object);
            writers.objectMenu(object);
            events.trigger(assert("You", "have looked at", object));


            stepRoutine();
        }
        return true;
    }

    return lookRoutine;

});


