yarn.service("lookRoutine", function (events,
                                      writers,
                                      assert,
                                      state,
                                      storyLog,
                                      stepRoutine) {

    // Process movement triggered by creating an assertion
    events.on("You did Look", "afterDefaultEvents", function () {
        var object = state.one("You look at *");
        lookRoutine(object);
    });

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


