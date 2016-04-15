yarn.service("lookRoutine", function (events,
                                      writers,
                                      assert,
                                      state,
                                      storyLog,
                                      yConsole) {

    // Process movement triggered by creating an assertion
    events.on("Player did Look", "after events", function () {
        var object = state.one("Player look at *");
        lookRoutine(object);
    });

    function lookRoutine(object) {
        if (object) {

            yConsole.log("Routine: look");
//            console.log("TRIGGERED! Routine: look");

            var thingName = state.resolveValue(assert(object, "has", "Name"));
            thingName = thingName || object.id;
            storyLog.action("You examine the " + thingName);

            writers.describeThing(object);
            writers.objectMenu(object);
            events.trigger(assert("Player", "has looked at", object));

        }
        return true;
    }

    return lookRoutine;

});


