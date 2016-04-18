yarn.service("playScriptRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            Script,
                                            yConsole) {
// todo: hook event for triggering script

//    events.on("Player did Look Around", "after dialogs", function () {
//        lookAroundRoutine();
//        state.negate(assert("Player", "did", "Look Around"));
//    });

    function lookAroundRoutine() {

        yConsole.log("Routine: playScript");

        var actedScript = state.one("Player is acting *");
        if (actedScript) {
            var scriptText = state.value("Script has Text", { Script: actedScript});
            var script = new Script(scriptText, actedScript.source);
            script.play();
        }

//        events.trigger(assert("Player", "has acted", "Script"));
//        events.trigger(assert("Player", "has acted", ????));

    }

    return lookAroundRoutine;

});


