yarn.service("hintRoutine", function (writers,
                                      assert,
                                      state,
                                      storyLog,
                                      stepRoutine) {

    function hintRoutine() {

        storyLog.action("You take a moment to think really hard");
        var room = state.resolveOne(assert("You", "is in"));
        writers.describeThing(room);

        stepRoutine();

        return true;
    }

    return hintRoutine;

});


