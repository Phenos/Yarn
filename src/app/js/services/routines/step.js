yarn.service("stepRoutine", function (events,
                                      state,
                                      dialogs,
                                      script,
                                      assert,
                                      sceneryService,
                                      player) {

    /**
     * Increment the game session step counter
     */
    return function stepRoutine() {
        state.step(1);
        // Process all the events
        var somethingHappened = events.process();
        // Check if dialogs are supposed to be said
        dialogs.process();

        // todo: Refactor... this type of reaction should go trough some sort of command or routine ?
        var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
        if (storyHasEnded) {
            player.refresh();
        }



        // Update the scenery in case it has changed
        updateScenery();

        state.assertions.removeLayer("step");
        return somethingHappened;
    };


    function updateScenery() {
        var room = state.resolveOne(assert("You", "is in"));
        if (room) {
            var scenery = state.resolveValue(assert(room, "has", "Scenery"));
            var url = script.resolveRelativeURI(scenery);
            if (url) {
                sceneryService.change(url);
            } else {
                sceneryService.clear();
            }
        }
    }
});

