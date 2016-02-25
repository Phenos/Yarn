yarn.service('events', function (state,
                                 Assertion,
                                 yConsole,
                                 consoleHelper) {

    function Events() {
    }

    Events.prototype.process = function () {
        var trigger = state.predicate("triggers");
        var triggerAssertions = state.getAssertions(null, trigger, null);
        //console.log("found triggerAssertions", triggerAssertions);
        angular.forEach(triggerAssertions, function (assertion) {
            // Fetch the list of assertions to be used as triggers
            var conditionAssertions = [];
            var allConditionsAreTrue = true;
            var object = assertion.object;
            var subject = assertion.subject;

            if (subject && object) {
                console.log("Testing : ", consoleHelper.assertion2log(assertion));

                angular.forEach(subject.childStates, function (assertionState) {
                    var assertion = assertionState.assertion;
                    conditionAssertions.push(assertion);
                    var isTrue = assertion.value();
                    if (!isTrue) allConditionsAreTrue = false;
                });
                //console.log("Found conditionAssertions", conditionAssertions);
                if (allConditionsAreTrue) {
                    console.log("triggering " + object.is);
                    angular.forEach(object.childStates, function (assertionState) {
                        var assertion = assertionState.assertion;
                        assertion.set(true, "session");
                        state.persistAssertion(assertion);
                        console.log("setting assertions", assertion);
                    });

                }
            } else {
                yConsole.error("The trigger is not well formed. You must have a complete assertion with a subject and an object.")
            }
        });

    };

    Events.prototype.trigger = function (subject, predicate, object) {
        var assertion = state.setAssertion(subject, predicate, object);
        assertion.set(true, "step");
    };

    return new Events();
});



