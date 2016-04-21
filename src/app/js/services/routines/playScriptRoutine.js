// todo: Rename playScriptRoutine to actRoutine
yarn.service("playScriptRoutine", function (events,
                                            writers,
                                            assert,
                                            state,
                                            storyLog,
                                            Script,
                                            yConsole) {

    events.on("Player acts *", "after dialogs", function () {
        playScriptRoutine();
        state.negate(assert("Player", "is acting"));
    });

    function playScriptRoutine(forcedAct) {

        yConsole.log("Routine: playScript");

        var act = forcedAct || state.one("Player is acting *");
        if (act) {
            var scriptText = state.value("CurrentAct has a Script", { CurrentAct: act});
            var script = new Script(scriptText, act.source);
            script.play();
        }

    }

    return playScriptRoutine;

});


