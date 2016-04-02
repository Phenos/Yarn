yarn.service("doRoutine", function (state,
                                    events,
                                    assert,
                                    stepRoutine) {

    function doRoutine(action, object) {

        // First check if the action is allowed in the current space
        if (action) {

            // Process attached triggers
            var triggeredObjects = state.resolveAll(assert(action, "triggers"));
            angular.forEach(triggeredObjects, function (object) {
                events.triggerNow(object)
            });

            events.trigger(assert("You", "did", action));
            events.trigger(assert("Action", "is", action));

            var predicate = state.value("Action has Predicate", {
                Action: action
            });

            if (predicate) {
                events.trigger(assert("You", predicate, object));

            }

            var space = state.one("You is in *");
            if (space) {
                events.trigger(assert(action, "inside the", space));
            }

            stepRoutine();
        }

        return true;
    }

    return doRoutine;

});

