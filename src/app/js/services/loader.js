yarn.service('loader', function (yarn,
                                 state,
                                 loadScript,
                                 yConsole,
                                 player,
                                 synonyms,
                                 statuses,
                                 status,
                                 commands) {

    var service = {};
    var loadStatus = status.new("Loading story");

    service.fromURL = function fromURL(_url) {
        state.assertions.removeLayer('session');
        state.assertions.removeLayer('code');
        var url = _url;

//        console.log("loader.fromURL", url);
        yConsole.log("Loading story from : " + url);

        loadStatus.start();

        return loadScript(url).then(onSuccess, onError);

        function onError() {
            yConsole.error("Failed to load story from this location: " +
                "<a target='_blank' href='" + url + "'>" + url + "</a>");
            yConsole.tip("This error can happen when either the address of the " +
                "story file is not correct or the file has been moved or deleted. " +
                "You can check the address for mistakes or check your connection.");
        }

        /*
         * Called once all files are loaded (including imports)
         */
        function onSuccess(script) {

            yarn.load(script.source, script.url).then(onSuccess, onError);

            function onSuccess(script) {

                // Change the current state layer to the static
                // code (should be the default anyways).
                state.currentLayer = "code";

                // Run the script to load the initial game state
                script.run();

                // Trigger validation on the new game state
                commands.run("validate");

                // Change the current state layer to the current session.
                state.currentLayer = "session";

                // Restore session state layer from localStorage
                state.restoreFromLocalState();

                /*
                 Refresh the list of Statuses and Synonyms, in case they changed during game play
                 */
                synonyms.update(state);
                statuses.update(state);

                console.info("Successfuly loaded story. Now refreshing player.");

                player.refresh();
                player.startStory();

                loadStatus.success();
                yConsole.log("Loading and compilation took " +
                    (loadStatus.duration() / 1000) + " seconds");
            }

            function onError(request) {
                loadStatus.fail();
                yConsole.error("Failed to load story asset from : " +
                    request.config.url);
                yConsole.tip("This error can happen when one of the " +
                    "imported asset (loaded with Import in your story) cannot " +
                    "be found. Either the address of the asset is not correct or " +
                    "the asset has been moved or deleted. You can check the address for " +
                    "mistakes or check your connection.");
            }

        }
    };

    return service;

});


