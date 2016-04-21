yarn.service("doRoutine", function (state,
                                    events,
                                    assert,
                                    step) {

    function doRoutine(action, object) {

        // First check if the action is allowed in the current space
        if (action) {

            step.run(function () {

                // Process attached triggers
                var triggeredObjects = state.resolveAll(assert(action, "triggers"));
                angular.forEach(triggeredObjects, function (_object) {
                    events.triggerNow(_object)
                });

                events.trigger(assert("Player", "did", action));
                events.trigger(assert("Action", "is", action));

                var predicate = state.value("Action has Predicate", {
                    Action: action
                });

                if (predicate) {
                    events.trigger(assert("Player", predicate, object));

                }

                var space = state.one("Player is in *");
                if (space) {
                    events.trigger(assert(action, "inside the", space));
                }

            });

        }

        return true;
    }

    return doRoutine;

});

