yarn.service('state', function (Assertion,
                                Assertions,
                                Thing,
                                Syntax,
                                Predicate,
                                layerSetup,
                                guid) {

    function State() {
        this.assertions = new Assertions();
        this.things = {};
        this.predicates = {};
        this.syntaxes = {};
        this.currentLayer = "world";
        this.localState = null;
        this.guid = guid();
    }

    State.prototype.restoreFromLocalState = function (localState) {
        return false;

        var self = this;
        this.localState = localState;
        angular.forEach(this.localState.assertions, function (assertion) {
            var object = null;
            if (typeof(assertion.object) === "number") {
                object = assertion.object;
            } else if (typeof(assertion.object) === "string") {
                if (assertion.object.indexOf("@id:") === 0) {
                    object = self.thing(assertion.object.substring(4));
                } else {
                    object = assertion.object;
                }
            }

            var newAssertion = self.setAssertion(
                self.thing(assertion.subject),
                self.predicate(assertion.predicate),
                object,
                assertion.value
            );
            //console.log("Restoring assertion from localState", assertion, newAssertion);
        });
    };

    State.prototype.getPredicates = function (tokens) {
        var self = this;
        var predicates = [];
        tokens.forEach(function (token) {
            var predicate = self.predicate(token);
            if (!predicate) throw "Unknown predicate [" + token + "] in expression [" + expression + "]";
            predicates.push(predicate);
        });
        return predicates;
    };

    /**
     * Get or create a new thing
     * @param _id
     */
    State.prototype.thing = function (_id, dontAutoCreate) {
        var thing = null;
        if (_id) {
            var id = _id.toLowerCase();
            thing = this.things[id];
            if (!thing) {
                if (dontAutoCreate) {
                    thing = null;
                } else {
                    thing = new Thing(id, this);
                    this.things[id] = thing;
                }
            }

        }

        return thing;
    };

    /**
     * Get or create a new thing
     * @param predicate
     * @param text
     * @returns {*}
     */
    State.prototype.syntax = function (predicate, text) {
        var syntax;

        if (!predicate)
            throw("Syntax must have a predicate");
        if (!text)
            throw("Syntax must have a text");
        syntax = this.syntaxes[text];
        if (!syntax) {
            syntax = new Syntax(text, predicate);
            this.syntaxes[text] = syntax;
        }
        return syntax;
    };

    /**
     * Get or create a new type of predicate
     * @param _id
     */
    State.prototype.predicate = function (_id, dontAutoCreate) {
        var predicate;
        var syntax;
        if (typeof(_id) === "string") {
            var id = _id.toLowerCase();

            if (!id)
                throw("Assertions must have an id");

            // Resolve the predicate from the syntax
            syntax = this.syntaxes[id];
            if (syntax) predicate = syntax.predicate;

            if (!predicate) {
                if (dontAutoCreate) {
                    predicate = null;
                } else {
                    predicate = new Predicate(id, this);
                    //console.log("Created new predicate", predicate);
                    this.predicates[id] = predicate;
                    this.syntaxes[id] = new Syntax(id, predicate);
                }
            }
        }
        return predicate;
    };

    /**
     * Get a new assertion
     * @param subject
     * @param predicate
     * @param object
     * @param value
     * @param parent
     * @param layer
     * @returns {*}
     */
    State.prototype.setAssertion = function (subject, predicate, object, value, parent, layer) {
        //console.log("State.setAssertion", subject, predicate, object, value);
        var self = this;

        // The set of assertions to negate first
        // First, verify that we have at least a subject and a predicate
        // Otherwise the assertions would not assert anything
        if (subject && predicate) {

            // Look for existing assertions that match the criteria
            // IMPORTANT: a isUnique predicate mean that we still keep negated assertions.
            // Instead we negate all the ones we dont need anymore
            if (predicate.uniqueSubject) {
                this.assertions.forEach(function (assertion) {
                    // If it is a "uniqueSubject" predicate, match assertions
                    // by subject and predicate only
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate) {
                        foundAssertions.push(assertion);
                    }

                    // When the predicate is "uniqueSubject"
                    // we re-test to see if the assertion is a perfect candidate
                    // to receive the new value
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate &&
                        assertion.object === object) {
                        chosenAssertion = assertion;
                    }
                });

            } else {
                this.assertions.forEach(function (assertion) {
                    // Otherwise, match assertions on all 3 criteras
                    // subject, predicate and object
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate &&
                        assertion.object === object) {
                        foundAssertions.push(assertion);
                        // When the predicate is not "uniqueSubject"
                        // any mathing assertion can be choses to
                        // receive the value
                        chosenAssertion = assertion;
                    }
                });
            }

            var assertion = new Assertion(subject, predicate, object, layer, parent, value);
            this.assertions.add(assertion);


            // todo: bring back after
            // If the current layer is for "session", store the assertion in the
            // localStorage provider
            //this.persistAssertion(chosenAssertion);
        } else {
            console.warn("Impossible to create assertion without at least a subject and a predicate.")
        }

        return chosenAssertion;
    };

    /**
     * Persist an assertion to localState for it "session" state layer (aka localStorage)
     * If the session layer is empty, the assertion is removed
     */
    State.prototype.persistAssertion = function (assertion) {
        if (this.localState) {
            var json = assertion.toJSON();
            if (json) {
                this.localState.assertions[assertion.id()] = json;
            } else {
                delete this.localState.assertions[assertion.id()];
            }
        }
    };

    State.prototype.negate = function (assertion) {
        var self = this;
        var assertions = [];
        // Recreate an array of assertions if a single assertion was passed
        if (angular.isArray(assertion)) {
            assertions = assertion;
        } else if (angular.isObject(assertion)) {
            assertions = [assertion]
        }
        angular.forEach(assertions, function (assertion) {
            if (assertion.value()) {
                assertion.value(false);
            }
            self.persistAssertion(assertion);
        });
    };

    State.prototype.step = function (increment) {
        var count = 0;
        var story = this.thing("Story");
        var hasStepped = this.predicate("hasStepped");

        var assertions = story.getAssertion(hasStepped);
        if (assertions.length) {
            if (typeof assertions[0].object === "number") {
                count = assertions[0].object;
            }
        }

        if (increment && typeof(increment) === "number") {
            count = count + increment;
            story.setAssertion(hasStepped, count);
        }

        return count;
    };

    return new State();


});

