angular.module('mindgame').factory('loadGameScripts', loadGameScripts);

function loadGameScripts(game,
                         loadPageScripts,
                         writers,
                         promptLoop,
                         splashService) {

    function loadGameScripts() {
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

    ///**
    // * handler when additionnal module must be imported from the initial loaded file
    // * @param source
    // */
    //function onLoad(source) {
    //    function onCompiled(script) {
    //        console.log("running script", source.substr(0, 100));
    //        //script.run(game.state, onImport);
    //    }
    //}

    //
    //// todo: put scriptLoader into a service
    //function onImport(url) {
    //    console.log("-------- REMOVE OLD IMPORTING: ", url);
    //}

    return loadGameScripts;

}



