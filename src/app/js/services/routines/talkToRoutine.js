yarn.service("talkToRoutine", function (events,
                                        assert,
                                        state,
                                        Script,
                                        storyLog,
                                        yConsole) {

    events.on("Player talks to *", "after dialogs", function () {
        talkToRoutine();
        state.negate(assert("Player", "talks to"));
    });

    function talkToRoutine(chainedTopic) {

        yConsole.log("Routine: talkTo");

        var interlocutor = chainedTopic || state.one("Player talks to *");

        if (interlocutor) {
            var topics = state.many("* is relevant to Interlocutor", {
                Interlocutor: interlocutor
            });

            if (topics) {
                storyLog.action("Thinking about what you could say...");
                angular.forEach(topics, function (topic) {
                    var name = state.value("CurrentTopic has a Name", {
                        CurrentTopic: topic
                    });
                    var topicIntro = state.value("CurrentTopic has a Topic Intro", {
                        CurrentTopic: topic
                    });
                    var label = topicIntro || name;
                    var output = [
                        "[", label, ":", topic.id ,"]"
                    ].join("");
                    console.log("scriptText>>> ", output);
                    storyLog.topic(output);
                });

            } else {
                storyLog.action("You can't of anything to talk about.")
            }

        }

    }

    return talkToRoutine;

});


