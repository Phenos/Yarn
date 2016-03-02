yarn.service('events', function (state,
                                 Assertion,
                                 yConsole) {

    function Events() {
    }

    Events.prototype.process = function () {
        var somethingHappened = false;

        var triggerAssertions = state.assertions.find({
            predicate: "trigger"
        });

        //console.log("TRIGGERS ---- > ", triggerAssertions);

        //console.log("found triggerAssertions", triggerAssertions);
        angular.forEach(triggerAssertions, function (assertion) {
            // Fetch the list of assertions to be used as triggers
            var conditionAssertions = [];
            var allConditionsAreTrue = true;
            var object = assertion.object;
            var subject = assertion.subject;

            // First we check if the triggerrer and the triggered are supplied
            if (subject && object) {
                //console.log("Testing : ", consoleHelper.assertion2log(assertion));

                if (subject.childStates && subject.childStates.length) {
                    angular.forEach(subject.childStates, function (assertionState) {
                        var assertion = assertionState.assertion;
                        conditionAssertions.push(assertion);
                        var isTrue = assertion.value();
                        if (!isTrue) allConditionsAreTrue = false;
                    });
                    //console.log("Found conditionAssertions", conditionAssertions);
                    if (allConditionsAreTrue) {
                        somethingHappened = true;

                        //console.log("triggering " + object.is);
                        angular.forEach(object.childStates, function (assertionState) {
                            var assertion = assertionState.assertion;
                            state.createAssertion(assertion.subject, assertion.predicate, assertion.object, {
                                value: true
                            });
                            //console.log("setting assertions", assertion);
                        });

                    }

                }
            } else {
                yConsole.error("The trigger is not well formed. You must have a complete assertion with a subject and an object.")
            }
        });

        return somethingHappened;
    };


    Events.prototype.trigger = function (subject, predicate, object) {
        state.createAssertion(subject, predicate, object, {
            layer: "step"
        });
    };

    return new Events();
});



