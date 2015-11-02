angular.module('mindgame').factory('loadGameScripts', loadGameScripts);

function loadGameScripts(game,
                         loadPageScripts,
                         writers,
                         promptLoop) {

    function loadGameScripts() {
        // Load all game scipts
        loadPageScripts('BigMess', onLoadScript).then(onLoadComplete);
    }

    function onLoadComplete() {
        writers
            .LogStoryIntroduction()
            .DescribeWhereYouAre();
        promptLoop.update();
    }

    function onLoadScript(source) {
        // TODO: game.game ????? UGLY!
        game.load(source).run();
    }

    return loadGameScripts;

}



