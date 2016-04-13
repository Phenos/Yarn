yarn.service("stepRoutine", function (events,
                                      state,
                                      dialogs,
                                      script,
                                      assert,
                                      synonyms,
                                      statuses,
                                      wallpaper,
                                      player,
                                      storyLog,
                                      currentTheme) {

    /**
     * Increment the game session step counter
     */
    var alreadyInsideStep = false;
    // TODO: This should be a for-each sequence with all item bound with same mechanic
    return function stepRoutine(action) {
        if (alreadyInsideStep) {
            console.warn("Prevented step recursion!");
            return;
        }
        alreadyInsideStep = true;


        // We keep track of where you are before parsing the events.
        var initialSpace = state.one("Player is in *");

        events.process("beforeStep");
        state.step(1);
        events.trigger(assert("Story", "did", "Step"));
        events.trigger(assert("Player", "did", "Step"));

        /*
         Refresh the list of Statuses and Synonyms, in case they changed during game play
         */
        events.process("beforeStateUpdate");
        synonyms.update(state);
        statuses.update(state);
        events.process("afterStateUpdate");

        // Calling the main action that triggered the step to be processed
        events.process("beforeAction");
        action && action();
        events.process("afterAction");

        // Process all the events
        events.process("beforeDefaultEvents");
        var somethingHappened = events.process();
        events.process("afterDefaultEvents");

        // Process movement by asertion. Ex.: You move to HouseInterior
        events.process("beforeMove");
        events.process("move");
        events.process("afterMove");

        // Check if dialogs are supposed to be said
        events.process("beforeDialogs");
        dialogs.process();
        events.process("afterDialogs");

        // todo: Refactor... this type of reaction should go trough some sort of command or routine ?
        events.process("beforeEnded");
        var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
        if (storyHasEnded) {
            player.refresh();
        }
        events.process("afterEnded");

        events.process("beforeEndStep");
        events.process("endStep");
        events.process("afterEndStep");

        // Flush the storyLog buffers
        storyLog.flushBuffers();

        // Update the wallpaper in case it has changed
        state.assertions.removeLayer("step");


        // If the user was moves... we describe again where you are
        // REMOVE? This was replaced with the "look around" event
//        var currentSpace = state.one("Player is in *");
//        if (initialSpace !== currentSpace) {
//            writers.describeWhereYouAre(true);
//        }

        updateWallpaper();

        alreadyInsideStep = false;
        return somethingHappened;
    };


    function updateWallpaper() {
        var room = state.resolveOne(assert("Player", "is in"));
        if (room) {
            var defaultWallpaperValue = state.resolveValue(assert("Story", "has", "Wallpaper"));
            var wallpaperValue = state.resolveValue(assert(room, "has", "Wallpaper"));
            var url = script.resolveRelativeURI(wallpaperValue || defaultWallpaperValue);
            if (url) {
                wallpaper.change({
                    image: url,
                    layout: "fullscreen"
                });
            } else {
                wallpaper.clear();
            }
        }
        currentTheme.refresh();
    }
});

