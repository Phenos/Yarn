yarn.service("stepRoutine", function (events,
                                      state,
                                      dialogs,
                                      script,
                                      sceneryService) {

    /**
     * Increment the game session step counter
     */
    return function stepRoutine() {
        state.step(1);
        // Process all the events
        var somethingHappened = events.process();
        // Check if dialogs are supposed to be said
        dialogs.process();

        // todo: detect if the current room has changed and
        // should be redrawn completely

        // Update the scenery in case it has changed
        updateScenery();

        state.assertions.removeLayer("step");
        return somethingHappened;
    };


    function updateScenery() {
        var room = state.resolveOne({
            subject: "You",
            predicate: "isIn"
        });

        if (room) {
            var scenery = state.resolveValue({
                subject: room.id,
                predicate: "has",
                object: "Scenery"
            });
            var url = script.resolveRelativeURI(scenery);
            if (url) {
                sceneryService.change(url);
            } else {
                sceneryService.clear();
            }
        }
    }
});

