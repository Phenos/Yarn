yarn.service("hintRoutine", function (writers,
                                      assert,
                                      state,
                                      events,
                                      transcript) {

    events.on("Player did Hint", "after events", function () {
        hintRoutine();
    });

    function hintRoutine() {

        transcript.action("You take a moment to think really hard and look around...");
        var room = state.resolveOne(assert("Player", "is in"));

        var roomName = state.resolveValue(assert(room, "has", "name"));
        transcript.log("You are at the [" + roomName + "]");

        writers.describeThing(room);

        transcript.log("Nothing else comes to mind.");

        return true;
    }

    return hintRoutine;

});

