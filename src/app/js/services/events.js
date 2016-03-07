yarn.service('events', function (state,
                                 Assertion,
                                 yConsole) {

    function Events() {
    }

    Events.prototype.process = function () {
        console.log("Events.process()");

        var somethingHappened = false;
        var setsToBeTriggered = [];

        var triggerAssertions = state.assertions.find({
            predicate: "trigger"
        });

        // First, figure out which assertions set will need to be triggered
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
                        var value = state.resolveValue({
                            subject: assertion.subject.id,
                            predicate: assertion.predicate.id,
                            object: assertion.object.id
                        });
                        if (!(value === assertion.value())) allConditionsAreTrue = false;
                    });
                    //console.log("allConditionsAreTrue", allConditionsAreTrue);
                    if (allConditionsAreTrue) {
                        setsToBeTriggered.push(object);
                    }
                }

            } else {
                yConsole.error("The trigger is not well formed. You must have a complete assertion with a subject and an object.")
            }
        });

        // Then, we trigger each assertion sets that are supposed to be triggered
        console.log("setsToBeTriggered ", setsToBeTriggered);
        angular.forEach(setsToBeTriggered, function (object) {
            var shouldOccur = true;
            var childAssertions = state.assertions.find({
                parent: object.id
            });

            var maximumOccurrence = state.resolveValue({
                "subject": object.id,
                "predicate": "has",
                "object": "MaximumOccurrence"
            });

            var Occurrence = state.resolveValue({
                "subject": object.id,
                "predicate": "has",
                "object": "Occurrence"
            });

            // Here we check if the event has reached the maximum allowed
            // number of occurrences
            if (!angular.isNumber(Occurrence)) Occurrence = 0;
            if (angular.isNumber(maximumOccurrence) && Occurrence >= maximumOccurrence) shouldOccur = false;


            if (shouldOccur) {
                somethingHappened = true;
                state.createAssertion(object, state.predicate("has"), state.thing("Occurrence"), {
                    value: Occurrence + 1
                });
                //console.log("childAssertions for " + object.id, childAssertions);
                angular.forEach(childAssertions, function (assertion) {
                    state.createAssertion(assertion.subject, assertion.predicate, assertion.object, {
                        value: assertion.value()
                    });
                });
            }


        });


        return somethingHappened;
    };


    Events.prototype.trigger = function (assert) {
        console.log("Trigger", assert);
        state.createAssertion(assert.subject, assert.predicate, assert.object, {
            layer: "step"
        });
    };

    return new Events();
});



