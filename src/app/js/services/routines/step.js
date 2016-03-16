yarn.service("stepRoutine", function (events,
                                      state,
                                      dialogs,
                                      script,
                                      assert,
                                      wallpaper,
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



        // Update the wallpaper in case it has changed
        updateWallpaper();

        state.assertions.removeLayer("step");
        return somethingHappened;
    };


    function updateWallpaper() {
        var room = state.resolveOne(assert("You", "is in"));
        if (room) {
            var wallpaperValue = state.resolveValue(assert(room, "has", "Wallpaper"));
            var url = script.resolveRelativeURI(wallpaperValue);
            if (url) {
                wallpaper.change(url);
            } else {
                wallpaper.clear();
            }
        }
    }
});

