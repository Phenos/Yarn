yarn.service("talkAboutRoutine", function (events,
                                      assert,
                                      state,
                                      Script,
                                      yConsole) {

    events.on("Player asks about *", "after dialogs", function () {
        console.log("####################################################");
        talkAboutRoutine();
        state.negate(assert("Player", "talks about"));
    });

    function talkAboutRoutine() {

        yConsole.log("Routine: talkAbout");

        var topic = state.one("Player talks about *");
        if (topic) {
            var scriptText = state.value("CurrentTopic has a Script", {CurrentTopic: topic});
            console.log("--->", scriptText, topic);
            var script = new Script(scriptText, topic.source);
            script.play();
        }

//        events.trigger(assert("Player", "has acted", "Script"));
//        events.trigger(assert("Player", "has acted", ????));

    }

    return talkAboutRoutine;

});


