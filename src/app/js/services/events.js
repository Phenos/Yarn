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

        //console.log("found triggerAssertions", triggerAssertions);
        angular.forEach(triggerAssertions, function (assertion) {
            // Fetch the list of assertions to be used as triggers
            var childAssertions;
            var allConditionsAreTrue = true;
            var object = assertion.object;
            var subject = assertion.subject;

            // First we check if the triggerrer and the triggered are supplied
            if (subject && object) {
                //console.log("Testing : ", consoleHelper.assertion2log(assertion));

                childAssertions = state.assertions.find({
                    parent: subject.id
                });

                if (childAssertions.length) {
                    //console.log("childAssertions", childAssertions);
                    angular.forEach(childAssertions, function (assertion) {
                        var isTrue = state.resolveValue({
                            subject: assertion.subject.id,
                            predicate: assertion.predicate.id,
                            object: assertion.object.id
                        });
                        //console.log("state.resolveValue(assertion)", isTrue);
                        if (!isTrue) allConditionsAreTrue = false;
                    });

                    if (allConditionsAreTrue) {
                        somethingHappened = true;
                        childAssertions = state.assertions.find({
                            parent: object.id
                        });
                        //console.log("childAssertions for " + object.id, childAssertions);
                        angular.forEach(childAssertions, function (assertion) {
                            state.createAssertion(assertion.subject, assertion.predicate, assertion.object, {
                                value: assertion.value()
                            });
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



