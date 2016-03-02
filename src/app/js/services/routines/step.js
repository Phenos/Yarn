yarn.service("stepRoutine", function (events,
                                      state,
                                      dialogs) {

    /**
     * Increment the game session step counter
     */
    return function stepRoutine() {
        state.step(1);
        var somethingHappened = events.process();
        dialogs.process();
        state.assertions.removeLayer("step");
        return somethingHappened;
    }

});

