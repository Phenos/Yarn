yarn.service('events', function (assert,
                                 parseAssert,
                                 state,
                                 predicates,
                                 things,
                                 yConsole) {

    var undef = void 0;

    function Events() {
        this.listeners = [];
    }

    function Listener(_assert, eventId, callback) {
        this.assert = _assert; // In text form
        this.eventId = eventId;
        this.callback = callback;
    }

    Events.prototype.on = function (_assert, eventID, callback) {
        var listener = new Listener(_assert, eventID, callback);
        this.listeners.push(listener);
    };

    Events.prototype.process = function (_eventId) {
        var eventId = _eventId || null;
        var self = this;
//        console.log("Events.process()");

        var somethingHappened = false;
        var setsToBeTriggered = [];

        yConsole.log("Processing events :" + (_eventId || "default"));

        var triggerAssertions = state.assertions.find(assert(undef, "trigger"));

//        console.log("triggerAssertions", triggerAssertions);

        // First, we trigger any hard-coded listeners
        angular.forEach(this.listeners, function (listener) {
            var assertValue;
            var assertionsMatched;
            var hasOneNonFalseMatch = false;
//            console.log("--> ", eventId, listener.eventId);
            // Continue if the eventId matches
            if (eventId && listener.eventId === eventId) {
//                console.log("2", listener.assert);
                // Continue if the assert is either true or if it resolves at least
                // one "true" object
                assertValue = state.value(listener.assert);
                var _assert = parseAssert(listener.assert, {
                    parent: null
                });
                assertionsMatched = state.resolveAll(_assert, true);

                angular.forEach(assertionsMatched, function (assertion) {
                    var __assert = assert(assertion.subject, assertion.predicate, assertion.object);
                    var value = state.resolveValue(__assert);
                    if (value) {
                        hasOneNonFalseMatch = true;
                    }
                });
//                console.log("assertValue", assertValue);
//                console.log("assertionsMatched", assertionsMatched);
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

            var triggerValue = state.value("Action triggers Event", {
                Action: assertion.subject,
                Event: assertion.object
            });
            console.log("triggerValue", triggerValue);

//            console.log("VALUE: ", value, eventId, [assertion]);

            // Check if the eventId provided matches
            if ((eventId && triggerValue === eventId) ||
                !eventId && triggerValue === true) {
//                console.log("Testing : ", consoleHelper.assertion2log(assertion));
                childAssertions = state.assertions.find(assert(undef, undef, undef, {
                    parent: subject.id
                }));

                if (childAssertions.length) {
//                    console.log("childAssertions", childAssertions);
                    angular.forEach(childAssertions, function (_assertion) {
                        var _value = state.resolveValue(
                            assert(_assertion.subject,
                                _assertion.predicate,
                                _assertion.object));
                        if (!(_value === _assertion.value())) {
                            allConditionsAreTrue = false;
                        }
                    });
//                    console.log("allConditionsAreTrue", allConditionsAreTrue);
                    if (allConditionsAreTrue) {
                        console.log("TRIGGERED!", object.id, eventId, triggerValue);
                        setsToBeTriggered.push({
                            object: object,
                            assertion: assertion,
                            event: triggerValue
                        });
                    }
                }

            }
        });

        // Then, we trigger each assertion sets that are supposed to be triggered
//        console.log("setsToBeTriggered ", setsToBeTriggered);
        angular.forEach(setsToBeTriggered, function (trigger) {
            var somethingHappenedNow = self.triggerNow(trigger.object, trigger.assertion);
            if (somethingHappenedNow) {
                somethingHappened = true;
            }
        });

        return somethingHappened;
    };


    Events.prototype.triggerNow = function (object, assertion) {

        var logOptions = {};
        if (assertion) {
            logOptions.source = assertion.source;
        }
        yConsole.log("Triggered: <span class='subject' command='inspect "
            + object.id + "'>" + object.text() + "</span>", logOptions);

        var somethingHappened = false;
        var shouldOccur = true;

        var maximumOccurrence = state.resolveValue(assert(object, "has", "Maximum Occurrence"));
        var Occurrence = state.resolveValue(assert(object, "has", "Occurrence"));

        // Here we check if the event has reached the maximum allowed
        // number of occurrences
        if (!angular.isNumber(Occurrence)) {
            Occurrence = 0;
        }
        if (angular.isNumber(maximumOccurrence) && Occurrence >= maximumOccurrence) {
            shouldOccur = false;
        }


        if (shouldOccur) {
            somethingHappened = true;
            // Todo: createAssertion should also use assert() ??
            state.createAssertion(object, predicates("has"), things.get("Occurrence"), {
                value: Occurrence + 1
            });

            state.applyObjectAsStageChange(object);

        }
        return somethingHappened;
    };


    Events.prototype.trigger = function (_assert) {
//        console.log("Trigger", assert);
        state.createAssertion(_assert.subject, _assert.predicate, _assert.object, {
            layer: "step"
        });
    };

    return new Events();
});



