yarn.service("actSceneRoutine", function (events,
                                          assert,
                                          state,
                                          Script,
                                          transcript,
                                          doReveal,
                                          yConsole) {

    events.on("Player acts *", "after dialogs", function () {
        actSceneRoutine();
        state.negate(assert("Player", "acts"));
    });

    function actSceneRoutine(chainedScene) {

//        yConsole.log("Routine: actScene");

        var scene = chainedScene || state.one("Player acts *");

        if (scene) {
            var actionName = state.value("CurrentScene has an Action Name", {
                CurrentScene: scene
            });

            console.log("actionName ======>>> ", actionName);
            if (actionName) {
                transcript.action("You choose to " + actionName);
            } else {
//                yConsole.warning("This scene did not have an <em>Action Name</em>");
            }

            var scriptText = state.value("CurrentScene has a Script", {
                CurrentScene: scene
            });

            var script = new Script(scriptText, scene.source);
            script.play();
            doReveal(scene);

            var nextScene = state.one("CurrentScene next scene *", {
                CurrentScene: scene
            });

            if (nextScene) {
                actSceneRoutine(nextScene);
            }

            var triggeredStateChange = state.resolveAll(assert(scene, "triggers"));
            angular.forEach(triggeredStateChange, function (object) {
                events.triggerNow(object)
            });
        }

//        events.trigger(assert("Player", "has acted", "Script"));
//        events.trigger(assert("Player", "has acted", ????));

    }

    return actSceneRoutine;

});


