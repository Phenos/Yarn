(function () {

    "use strict";

    angular.module('mindgame').factory('gameController', gameController);
    angular.module('mindgame').factory('gameService', gameService);


    function gameService() {
        var controller = null;

        function register(ctrl) {
            console.log("register", ctrl);
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
                            loadPageScripts,
                            writers,
                            promptLoop,
                            splashService,
                            ngAudio,
                            gameService) {

        var controller = {
            loadFromPage: loadFromPage,
            loadFromURL: loadFromURL
        };
        gameService.register(controller);


        // todo: bring back embiant loop
        //var ambientSound = ngAudio.load("./sounds/166187__drminky__creepy-dungeon-ambience.mp3");
        //// todo: Load sound ambience from story
        //ambientSound.play();
        //ambientSound.loop = true;


        function loadFromURL(url) {
            console.log("loadFromURL : ", url);
            return loadScript(url).then(function (script) {
                console.log("wah?", script);
                return onSuccess([script]);
            });
        }

        function loadFromPage() {
            // Load all game scipts
            return loadPageScripts('yarn')
                .then(onSuccess, onFail);
        }

        function onFail(error) {
            console.log("Fail????? BOOOM!!! ", error);
        }


        /**
         * Called once all files are loaded (including imports)
         */
        function onSuccess(scripts) {
            console.info("Game script loaded successfully", scripts);

            if (scripts.length) {
                game.load(scripts[0].source, scripts[0].url).then(function (script) {
                    console.log("============[ THIS SHOULD BE THE LAST CALL ]============");
                    console.log("script WHOO", script);

                    script.run(game.state);

                    console.log("======[ SHOULD HAVE ENDED RUN ]=======");
                    splashService.hide();
                    writers
                        .LogStoryIntroduction()
                        .DescribeWhereYouAre();
                    promptLoop.update();

                });
            }


        }

        return controller;

    }

})();


