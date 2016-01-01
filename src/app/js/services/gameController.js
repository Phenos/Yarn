(function () {
    "use strict";

    angular.module('mindgame').factory('gameController', gameController);
    angular.module('mindgame').factory('gameService', gameService);

    function gameService(yConsole) {
        var controller = null;

        function register(ctrl) {
            //console.log("register", ctrl);
            controller = ctrl;
        }

        function loadFromURL(url) {
            controller.loadFromURL(url);
        }

        return {
            register: register,
            loadFromURL: loadFromURL
        }
    }

    //todo: should this be the main game controller ?
    function gameController(game,
                            loadScript,
                            writers,
                            promptLoop,
                            yConsole,
                            splashService,
                            gameService) {

        var controller = {
            loadFromURL: loadFromURL
        };
        gameService.register(controller);


        // todo: bring back embiant loop
        //var ambientSound = ngAudio.load("./sounds/166187__drminky__creepy-dungeon-ambience.mp3");
        //// todo: Load sound ambience from story
        //ambientSound.play();
        //ambientSound.loop = true;


        function loadFromURL(_url) {
            var url = _url.replace(/\\/g, "/");
            yConsole.log("Loading story from : " + _url);
            return loadScript(url).then(onSuccess, onError);

            function onError() {
                yConsole.error("Failed to load story from this location: <a target='_blank' href='" + url + "'>" + url + "</a>");
                yConsole.hint("This error can happen when either the address of the story file is not correct or the file has been moved or deleted. You can check the address for mistakes or check your connection.");
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
                    yConsole.log("Running the story");

                    // todo: this .run should be a promise and show a success or error message in the game console
                    script.run(game.state);
                    // Change the current state layer to the current session.
                    game.state.currentLayer = "session";

                    //console.log("======[ SHOULD HAVE ENDED RUN ]=======");
                    splashService.hide();
                    writers
                        .LogStoryIntroduction()
                        .DescribeWhereYouAre();
                    promptLoop.update();

                }
                function onError (request) {
                    yConsole.error("Failed to load story asset from : " + request.config.url);
                    yConsole.hint("This error can happen when one of the imported asset (loaded with Import in your story) cannot be found. Either the address of the asset is not correct or the asset has been moved or deleted. You can check the address for mistakes or check your connection.");
                }

            }
        }

        return controller;

    }

})();


