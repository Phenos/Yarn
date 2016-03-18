yarn.service("hintRoutine", function (writers,
                                      assert,
                                      state,
                                      storyLog,
                                      stepRoutine) {

    function hintRoutine() {

        storyLog.action("You take a moment to think really hard and look around...");
        var room = state.resolveOne(assert("You", "is in"));

        var roomName = state.resolveValue(assert(room, "has", "name"));
        storyLog.log("You are at the [" + roomName + "]");

        writers.describeThing(room);

        stepRoutine();

        return true;
    }

    return hintRoutine;

});


