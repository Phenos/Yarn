angular.module('mindgame').factory('loadGameScripts', loadGameScripts);

function loadGameScripts(game,
                         loadScript,
                         loadPageScripts,
                         writers,
                         promptLoop,
                         splashService, $timeout) {

    function loadGameScripts() {
        // Load all game scipts
        loadPageScripts('yarn')
            .then(onSuccess, onFail, onLoad);
        splashService.hide();
    }

    function onFail(error) {
        console.log("Fail? ", error);
    }

    /**
     * Called once all files are loaded (including imports)
     */
    function onSuccess(result) {
        console.info("Game script loaded successfully", result);
        splashService.hide();
        writers
            .LogStoryIntroduction()
            .DescribeWhereYouAre();
        promptLoop.update();
    }

    /**
     * handler when additionnal module must be imported from the initial loaded file
     * @param source
     */
    function onLoad(source) {
        game.load(source).then(onCompiled);
        function onCompiled(script) {
            console.log("running script", source.substr(0, 100));
            script.run(game.state, onImport);
        }
    }


    // todo: put scriptLoader into a service
    function onImport(url) {
        console.log("IMPORTING: ", url);
        loadScript(url).then(onLoad);
        function onLoad(source) {
            console.log("IMPORTED: ", url);
            var script = game.load(source).then(onCompiled);

            function onCompiled() {
                script.run(game.state);
            }
        }
    }

    return loadGameScripts;

}



