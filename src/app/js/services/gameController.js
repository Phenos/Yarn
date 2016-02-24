(function () {
    "use strict";

    yarn.factory('gameController', gameController);
    yarn.factory('gameService', gameService);

    // Game Controller and Service are REDUNDANT

    function gameService() {
        var controller = null;

        function register(ctrl) {
            controller = ctrl;
        }

        function loadFromURL(url) {
            controller.loadFromURL(url);
        }

        function loadFromSource(source, baseURL) {
            controller.loadFromSource(source, baseURL);
        }

        function updateStoryLog() {
            controller.updateStoryLog();
        }

        return {
            register: register,
            updateStoryLog: updateStoryLog,
            loadFromSource: loadFromSource,
            loadFromURL: loadFromURL
        }
    }

    //todo: should this be the main game controller ?
    function gameController(game,
                            state,
                            loadScript,
                            writers,
                            promptLoop,
                            yConsole,
                            splashService,
                            gameService,
                            $localStorage) {

        var controller = {
            loadFromURL: loadFromURL,
            loadFromSource: loadFromSource,
            updateStoryLog: updateStoryLog
        };

        gameService.register(controller);


        function loadFromURL(_url) {
            state.removeAssertionsLayer('session');
            state.removeAssertionsLayer('world');

            // hack to protect windows drive letters in the path
            //var url = _url.replace(/\\/g, "//");
            var url = _url;

            yConsole.log("Loading story from : " + url);
            return loadScript(url).then(onSuccess, onError);

            function onError() {
                yConsole.error("Failed to load story from this location: <a target='_blank' href='" + url + "'>" + url + "</a>");
                yConsole.tip("This error can happen when either the address of the story file is not correct or the file has been moved or deleted. You can check the address for mistakes or check your connection.");
            }

            /**
             * Called once all files are loaded (including imports)
             */
            function onSuccess(script) {
                //console.info("Game script loaded successfully", script);

                game.load(script.source, script.url).then(onSuccess, onError);

                function onSuccess(script) {
                    //console.log("============[ THIS SHOULD BE THE LAST CALL ]============");
                    //console.log("script WHOO", script);
                    yConsole.success("Successfully loaded the story script");
                    yConsole.log("Running the <span command='inspect story'>story</span>");

                    // todo: this .run should be a promise and show a success or error message in the game console
                    // Change the current state layer to the static world (should be the default anyways).
                    state.currentLayer = "world";
                    script.run();

                    // Change the current state layer to the current session.
                    state.currentLayer = "session";

                    // Restore session state layer from localStorage
                    if (!$localStorage.localState) $localStorage.localState = {};
                    game.restoreFromLocalState($localStorage.localState);

                    //console.log("======[ SHOULD HAVE ENDED RUN ]=======");
                    splashService.hide();
                    updateStoryLog();

                }

                function onError(request) {
                    yConsole.error("Failed to load story asset from : " + request.config.url);
                    yConsole.tip("This error can happen when one of the imported asset (loaded with Import in your story) cannot be found. Either the address of the asset is not correct or the asset has been moved or deleted. You can check the address for mistakes or check your connection.");
                }

            }
        }

        function updateStoryLog() {
            writers
                .LogStoryIntroduction()
                .DescribeWhereYouAre();
            promptLoop.update();
        }

        function loadFromSource(source, _baseURL) {

            // hack to protect windows drive letters in the path
            //var baseURL = _baseURL.replace(/\\/g, "//");
            var baseURL = _baseURL;

            yConsole.log("Loading story from source");
            console.log("Story source: ", source);

            game.load(source, baseURL).then(onSuccess, onError);

            // TODO:  THIS METHOD IS A TOTAL DUPLICATE!!!! BEURK
            function onSuccess(script) {
                console.log("OnSuccess ???!");
                //console.log("============[ THIS SHOULD BE THE LAST CALL ]============");
                //console.log("script WHOO", script);
                yConsole.success("Successfully loaded the story script");
                yConsole.log("Running the <span command='inspect story'>story</span>");

                // todo: this .run should be a promise and show a success or error message in the game console
                // Change the current state layer to the static world (should be the default anyways).
                state.currentLayer = "world";
                script.run();

                // Change the current state layer to the current session.
                state.currentLayer = "session";
                console.log("A!");
                // Restore session state layer from localStorage
                if (!$localStorage.localState) $localStorage.localState = {};
                game.restoreFromLocalState($localStorage.localState);

                console.log("B");

                //console.log("======[ SHOULD HAVE ENDED RUN ]=======");
                splashService.hide();
                updateStoryLog();

            }

            // TODO:  THIS METHOD IS A TOTAL DUPLICATE!!!! BEURK
            function onError(request) {
                yConsole.error("Failed to load story asset from : " + request.config.url);
                yConsole.tip("This error can happen when one of the imported asset (loaded with Import in your story) cannot be found. Either the address of the asset is not correct or the asset has been moved or deleted. You can check the address for mistakes or check your connection.");
            }

        }

        return controller;

    }

})();

