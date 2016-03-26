yarn.service('events', function (assert,
                                 parseAssert,
                                 state,
                                 predicates,
                                 things) {

    function Events() {
        this.listeners = [];
    }

    function Listener(assert, eventId, callback) {
        this.assert = assert; // In text form
        this.eventId = eventId;
        this.callback = callback;
    }

    Events.prototype.on = function (assert, eventID, callback) {
        var listener = new Listener(assert, eventID, callback);
        this.listeners.push(listener);
    };

    Events.prototype.process = function (_eventId) {
        var eventId = _eventId || null;
        var self = this;
        //console.log("Events.process()");

        var somethingHappened = false;
        var setsToBeTriggered = [];

        var triggerAssertions = state.assertions.find(assert(undefined, "trigger"));

        //console.log("triggerAssertions", triggerAssertions);

        // First, we trigger any hard-coded listeners
        angular.forEach(this.listeners, function (listener) {
            var assertValue;
            var assertionsMatched;
            var hasOneNonFalseMatch = false;
            //console.log("--> ", eventId, listener.eventId);
            // Continue if the eventId matches
            if (eventId && listener.eventId === eventId) {
                //console.log("2", listener.assert);
                // Continue if the assert is either true or if it resolves at least
                // one "true" object
                assertValue = state.value(listener.assert);
                var _assert = parseAssert(listener.assert, {
                    parent: null
                });
                assertionsMatched = state.resolveAll(_assert, true);

                angular.forEach(assertionsMatched, function (assertion) {
                    var _assert = assert(assertion.subject, assertion.predicate, assertion.object);
                    var value = state.resolveValue(_assert);
                    if (value) hasOneNonFalseMatch = true;
                });
                //console.log("assertValue", assertValue);
                //console.log("assertionsMatched", assertionsMatched);
                if (assertValue || hasOneNonFalseMatch) {
                    // todo: Figure out if the callback should pass any values
                    listener.callback && listener.callback();
                }
            }
        });

        // Second, figure out which assertions set will need to be triggered
        angular.forEach(triggerAssertions, function (assertion) {
            // Fetch the list of assertions to be used as triggers
            var childAssertions;
            var allConditionsAreTrue = true;
            var object = assertion.object;
            var subject = assertion.subject;

            //todo: The value should be resolved from the state instead of being raw
            var value = assertion.value();

            //console.log("VALUE: ", value, eventId, [assertion]);

            if ((eventId && value === eventId) || !eventId) {
                //console.log("Testing : ", consoleHelper.assertion2log(assertion));
                childAssertions = state.assertions.find(assert(undefined, undefined, undefined, {
                    parent: subject.id
                }));

                if (childAssertions.length) {
                    //console.log("childAssertions", childAssertions);
                    angular.forEach(childAssertions, function (assertion) {
                        var value = state.resolveValue(
                            assert(assertion.subject,
                                assertion.predicate,
                                assertion.object));
                        if (!(value === assertion.value())) allConditionsAreTrue = false;
                    });
                    //console.log("allConditionsAreTrue", allConditionsAreTrue);
                    if (allConditionsAreTrue) {
                        setsToBeTriggered.push(object);
                    }
                }

            }
        });

        // Then, we trigger each assertion sets that are supposed to be triggered
        //console.log("setsToBeTriggered ", setsToBeTriggered);
        angular.forEach(setsToBeTriggered, function (object) {
            var somethingHappenedNow = self.triggerNow(object);
            if (somethingHappenedNow) somethingHappened = true;
        });

        return somethingHappened;
    };


    Events.prototype.triggerNow = function (object) {
        //console.log("Events.prototype.triggerNow", object);
        var somethingHappened = false;
        var shouldOccur = true;
        var childAssertions = state.assertions.find(assert(undefined, undefined, undefined, {
            parent: object.id
        }));

        var maximumOccurrence = state.resolveValue(assert(object, "has", "MaximumOccurrence"));
        var Occurrence = state.resolveValue(assert(object, "has", "Occurrence"));

        // Here we check if the event has reached the maximum allowed
        // number of occurrences
        if (!angular.isNumber(Occurrence)) Occurrence = 0;
        if (angular.isNumber(maximumOccurrence) && Occurrence >= maximumOccurrence) shouldOccur = false;


        if (shouldOccur) {
            somethingHappened = true;
            // Todo: createAssertion should also use assert() ??
            state.createAssertion(object, predicates("has"), things.get("Occurrence"), {
                value: Occurrence + 1
            });
            //console.log("childAssertions for " + object.id, childAssertions);
            angular.forEach(childAssertions, function (assertion) {
                //console.log(">>>triggered assertion", assertion);
                var value = assertion.value();
                // If the value is a string, we first render it!
                if (angular.isString(value)) {
                    value = state.render(value);
                }
                //console.log("triggerNow value", value);
                state.createAssertion(assertion.subject, assertion.predicate, assertion.object, {
                    value: value
                });
            });
        }
        return somethingHappened;
    };


    Events.prototype.trigger = function (assert) {
        //console.log("Trigger", assert);
        state.createAssertion(assert.subject, assert.predicate, assert.object, {
            layer: "step"
        });
    };

    return new Events();
});



