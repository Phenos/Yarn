yarn.service("talkToRoutine", function (events,
                                        assert,
                                        state,
                                        Script,
                                        storyLog,
                                        yConsole,
                                        things,
                                        predicates) {

    events.on("Player talks to *", "after dialogs", doTalkToRoutine);
    events.on("Player talks to *", "prompts", doTalkToRoutine);

    function doTalkToRoutine() {
        talkToRoutine();
        state.negate(assert("Player", "talks to"));
    }

    function talkToRoutine(chainedTopic) {

        yConsole.log("Routine: talkTo");

        var interlocutor = chainedTopic || state.one("Player talks to *");

        if (interlocutor) {

            // Take not of the Latest Interlocutor
            state.createAssertion(
                things.get("Player"),
                predicates("has"),
                things.get("Latest Interlocutor"), {
                    value: interlocutor.id
                });

            var topics = state.many("* is relevant to Interlocutor", {
                Interlocutor: interlocutor
            });

            topics = topics.filter(function (topic) {
                var isHidden = state.value("CurrentTopic is Hidden", {
                    CurrentTopic: topic
                });
                return !isHidden;
            });

            if (topics && topics.length > 0) {
                storyLog.action("You think about what you could say...");

                angular.forEach(topics, function (topic) {
                    var name = state.value("CurrentTopic has a Name", {
                        CurrentTopic: topic
                    });
                    var topicIntro = state.value("CurrentTopic has a Topic Intro", {
                        CurrentTopic: topic
                    });
                    var label = topicIntro || name;
                    var output = [
                        "[", label, ":", topic.id, ": Talk About ]"
                    ].join("");
                    //                        console.log("scriptText>>> ", output);
                    storyLog.topic(output);
                });
            } else {
                storyLog.action("You can't think of anything to talk about.")
            }

        }

    }

    return talkToRoutine;

});


