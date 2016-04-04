yarn.service('loader', function (yarn,
                                 state,
                                 loadScript,
                                 yConsole,
                                 player,
                                 synonyms,
                                 statuses,
                                 commands) {

    var service = {};

     var timer = {
         beforeLoad: null,
         afterCompile: null
     };


    service.fromURL = function fromURL(_url) {
        state.assertions.removeLayer('session');
        state.assertions.removeLayer('world');
        var url = _url;

        //console.log("loader.fromURL", url);
        yConsole.log("Loading story from : " + url);

        timer.beforeLoad  = performance.now();
        return loadScript(url).then(onSuccess, onError);

        function onError() {
            yConsole.error("Failed to load story from this location: <a target='_blank' href='" + url + "'>" + url + "</a>");
            yConsole.tip("This error can happen when either the address of the story file is not correct or the file has been moved or deleted. You can check the address for mistakes or check your connection.");
        }

        /**
         * Called once all files are loaded (including imports)
         */
        function onSuccess(script) {
            timer.afterCompile  = performance.now();
            var duration = Math.floor(timer.afterCompile - timer.beforeLoad) / 1000;
            yConsole.log("Loading and compilation took " + duration + " seconds");
            console.info("Loading and compilation took " + duration + " seconds");

            yarn.load(script.source, script.url).then(onSuccess, onError);

            function onSuccess(script) {
                //console.log("============[ THIS SHOULD BE THE LAST CALL ]============");
                //console.log("script WHOO", script);
                yConsole.success("Successfully loaded the story script");
                yConsole.log("Running the <span command='inspect story'>story</span>");

                // Change the current state layer to the static world (should be the default anyways).
                state.currentLayer = "world";

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


                player.refresh();
            }

            function onError(request) {
                yConsole.error("Failed to load story asset from : " + request.config.url);
                yConsole.tip("This error can happen when one of the imported asset (loaded with Import in your story) cannot be found. Either the address of the asset is not correct or the asset has been moved or deleted. You can check the address for mistakes or check your connection.");
            }

        }
    };

    return service;

});


