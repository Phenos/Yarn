yarn.service("thinkAboutRoutine", function (events,
                                           assert,
                                           state,
                                           Script,
                                           storyLog,
                                           yConsole,
                                           doReveal,
                                           things,
                                           predicates) {

    events.on("Player thinks about *", "dialogs", function () {
        thinkAboutRoutine();
        state.negate(assert("Player", "thinks about"));
    });

    function thinkAboutRoutine(chainedTopic) {

        yConsole.log("Routine: thinkAbout");

        var item = chainedTopic || state.one("Player thinks about *");

        if (item) {
            var itemLabel = state.value("CurrentItem has a Label", {
                CurrentItem: item
            });

            var thinkAboutLabel = state.value("CurrentItem has a Think About Label", {
                CurrentItem: item
            });

            itemLabel = thinkAboutLabel || itemLabel;

            if (itemLabel) {
                storyLog.action("You think about " + itemLabel);
            } else {
                storyLog.action("You thinks...");
            }

            var scriptText = state.value("CurrentItem has a Script", {
                CurrentItem: item
            });

            var script = new Script(scriptText, item.source);
            script.play();

            var nextItem = state.one("CurrentItem next item *", {
                CurrentItem: item
            });

//            console.log("nextTopic", nextTopic);
            if (nextItem) {
                thinkAboutRoutine(nextItem);
            } else {
                var latestList = state.value("Player has Latest Listing");

                // todo: Recall the talkToRoutine according to the Latest Interlocutor
                if (latestList) {
                    state.createAssertion(
                        things.get("Player"),
                        predicates("lists"),
                        things.get(latestList), {
                            layer: "step"
                        });
                }
            }

            doReveal(item);

            // todo: Refactor this... it's repeated in a few places
            var triggeredStateChange = state.resolveAll(assert(item, "triggers"));
            angular.forEach(triggeredStateChange, function (object) {
                events.triggerNow(object)
            });
        }

    }

    return thinkAboutRoutine;

});


