yarn.service("talkAboutRoutine", function (events,
                                           assert,
                                           state,
                                           Script,
                                           storyLog,
                                           yConsole,
                                           doReveal,
                                           things,
                                           predicates,
                                           talkToRoutine) {

    events.on("Player talks about *", "dialogs", function () {
        talkAboutRoutine();
        state.negate(assert("Player", "talks about"));
    });

    function talkAboutRoutine(chainedTopic) {

        yConsole.log("Routine: talkAbout");

        var topic = chainedTopic || state.one("Player talks about *");

        if (topic) {
            var topicName = state.value("CurrentTopic has a Name", {
                CurrentTopic: topic
            });

            if (topicName) {
                storyLog.action("You decide to talk about the " + topicName);
            } else {
                storyLog.action("You start talking");
            }

            var scriptText = state.value("CurrentTopic has a Script", {
                CurrentTopic: topic
            });
//            console.log("--->", scriptText, topic);
            var script = new Script(scriptText, topic.source);
            script.play();

            var nextTopic = state.one("CurrentTopic next topic *", {
                CurrentTopic: topic
            });

//            console.log("nextTopic", nextTopic);
            if (nextTopic) {
                talkAboutRoutine(nextTopic);
            } else {
                var latestInterlocutor = state.value("Player has Latest Interlocutor");

                // todo: Recall the talkToRoutine according to the Latest Interlocutor
                if (latestInterlocutor) {
                    state.createAssertion(
                        things.get("Player"),
                        predicates("talks to"),
                        things.get(latestInterlocutor), {
                            layer: "step"
                        });
                }
            }

            doReveal(topic);

            var triggeredStateChange = state.resolveAll(assert(topic, "triggers"));
            angular.forEach(triggeredStateChange, function (object) {
                events.triggerNow(object)
            });
        }

//        events.trigger(assert("Player", "has acted", "Script"));
//        events.trigger(assert("Player", "has acted", ????));

    }

    return talkAboutRoutine;

});


