yarn.service("stepRoutine", function (events,
                                      state) {

    /**
     * Increment the game session step counter
     */
    function stepRoutine() {
        state.step(1);
        events.process();
        state.removeAssertionsLayer("step");
        return true;
    }

    return stepRoutine;

});

