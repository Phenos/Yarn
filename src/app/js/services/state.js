yarn.service('state', function ($localStorage,
                                Assertion,
                                Assertions,
                                Thing,
                                Syntax,
                                Predicate,
                                yConsole,
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

        State.prototype.restoreFromLocalState = function () {
            var self = this;
            var localAssertions = ($localStorage.localState &&
                $localStorage.localState.assertions) || {};

            //console.log("Restoring assertion from localState", localAssertions);

            angular.forEach(localAssertions, function (assertion) {
                var object = null;
                var subject = null;

                // todo : Refactor the following next two blocks for D.R.Y.

                if (typeof(assertion.object) === "number") {
                    object = assertion.object;
                } else if (typeof(assertion.object) === "string") {
                    if (assertion.object.indexOf("@id:") === 0) {
                        object = self.thing(assertion.object.substring(4));
                    } else {
                        object = assertion.object;
                    }
                }

                if (typeof(assertion.subject) === "number") {
                    object = assertion.subject;
                } else if (typeof(assertion.subject) === "string") {
                    if (assertion.subject.indexOf("@id:") === 0) {
                        subject = self.thing(assertion.subject.substring(4));
                    } else {
                        subject = assertion.subject;
                    }
                }

                var newAssertion = self.createAssertion(
                    subject,
                    self.predicate(assertion.predicate),
                    object, {
                        value: assertion.value
                    }
                );
                //console.log("Restored:", assertion, newAssertion);
            });
        };

        /**
         * Get or create a new thing
         * @param _id
         * @param dontAutoCreate
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
                        thing.label(_id);
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
         * @param dontAutoCreate
         */
        State.prototype.predicate = function (_id, dontAutoCreate) {
            var predicate;
            var syntax;
            if (typeof(_id) === "string") {
                var id = _id.toLowerCase();

                // Resolve the predicate from the syntax
                syntax = this.syntaxes[id];
                if (!syntax) {
                    if (dontAutoCreate) {
                        predicate = null;
                    } else {
                        predicate = new Predicate(id, this);
                        //console.log("Created new predicate", predicate);
                        this.predicates[id] = predicate;
                        // By default, create a positivie syntax for the ad hoc predicate
                        this.syntax(id, predicate, true);
                    }
                } else {
                    predicate = syntax.predicate;
                }
            } else {
                console.error("You must provide an id to find a predicate");
            }
            return predicate;
        };

        State.prototype.resolveAll = function resolveAll(criterias) {
            var foundObjects = [];
            if (criterias && (criterias.subject && criterias.predicate) || (criterias.object && criterias.predicate)) {
                var foundObjectsSets = {};
                //console.log("criterias", criterias);

                // Exclused parented assertions unless already specified
                if (angular.isUndefined(criterias.parent)) criterias.parent = null;

                // Match all assertions to the criterias
                var assertions = this.assertions.find(criterias);


                // Sort assertion by weight
                assertions = assertions.sort(function (a, b) {
                    return a.weight() - b.weight();
                });

                // Check if the item to be resolved is the object or the subject
                var typeToResolve = (criterias.object) ? "subject" : "object";

                // Split all assertion by their unique thing to be resolved
                assertions.forEach(function (assertion) {
                    var foundObjectSet;
                    if (assertion[typeToResolve]) {
                        foundObjectSet = foundObjectsSets[assertion[typeToResolve].id];
                        if (!foundObjectSet) foundObjectSet = foundObjectsSets[assertion[typeToResolve].id] = [];
                        foundObjectSet.push(assertion);
                    }
                });

                angular.forEach(foundObjectsSets, function (foundObjectSet) {
                    var topAssertion = foundObjectSet[foundObjectSet.length - 1];
                    if (topAssertion.value()) foundObjects.push(topAssertion[typeToResolve]);
                });
                //console.log("FOUND: ", foundObjects);

            }
            //console.log("foundObjects", foundObjects);
            return foundObjects;
        };

        State.prototype.resolveOne = function (criterias) {
            var value = null;
            var objs = this.resolveAll(criterias);
            if (objs.length) {
                // We make sure that the top-most item is taken, in a case where
                // multiple assertions would have been true, the heaviest one
                // should be used
                value = objs[objs.length - 1];
            }
            return value;
        };

        State.prototype.resolveValue = function (criterias) {
            var value = null;
            if (criterias && (criterias.subject && criterias.predicate)) {

                // Exclused parented assertions
                criterias.parent = null;

                // If no object is supplied as criteria,
                // If no object is supplied as criteria,
                // indicate is should match for "no objects"
                if (!criterias.object) criterias.object = null;

                // Match all assertions to the criterias
                var assertions = this.assertions.find(criterias);

                //console.log("criterias", criterias);
                //console.log("assertions", assertions);

                // Sort assertion by weight
                assertions = assertions.sort(function (a, b) {
                    return a.weight() - b.weight();
                });

                var topAssertion = assertions[assertions.length - 1];
                if (topAssertion) {
                    value = topAssertion.value();
                }

            }
            //console.log("foundObjects", foundObjects);
            return value;
        };

        /**
         * Get a new assertion
         * @param subject
         * @param predicate
         * @param object
         * @param _options
         * @returns {*}
         */
        State.prototype.createAssertion = function (subject, predicate, object, _options) {
            var options = _options || {};

            if (subject && predicate && object) {
                var _predicate = predicate;

                // If the predicate is a negation, we find the positive predicate
                // and force the value to false. We also warn if the author attempts
                // to set a value with a negative predicate
                if (typeof(_predicate.negative) === "string" && _predicate.negative !== "") {
                    if (angular.isDefined(options.value)) {
                        yConsole.error(
                            ["Setting a value with a negative assertion is not allowed. Ref.: ",
                                subject.id,
                                predicate.id,
                                object.id
                            ].join(" "));
                    }
                    options.value = false;
                    _predicate = this.predicate(predicate.negative);
                }

                // If no value is provided, we set "true" as the default
                if (angular.isUndefined(options.value)) {
                    options.value = true;
                }

                // If not layer is provided, we set the "currentLayer"
                if (!options.layer) {
                    options.layer = this.currentLayer;
                }

                if (!options.parent && this.currentLayer !== "world") {
                    // Find exquivalent assertions to be negated
                    this.negate({
                        subject: subject.id,
                        predicate: _predicate.id,
                        object: object.id
                    });
                }
                var identicalAssertions = this.assertions.filter({
                    subject: subject.id,
                    predicate: _predicate.id,
                    object: object.id,
                    layer: options.layer,
                    parent: options.parent
                });
                if (identicalAssertions.count() > 0) {
                    var topAssertion = identicalAssertions.sortByWeight().top();
                    if (topAssertion.layer === "world") {
                        // If the top assertion in on the static world layer
                        // We create a new assertion anyways
                        var assertion = new Assertion(subject, _predicate, object, options);
                        this.assertions.add(assertion);
                        this.persistAssertion(assertion);
                    } else {
                        // Else we re-use the existing assertion
                        topAssertion.value(options.value);
                        this.persistAssertion(topAssertion);
                    }
                } else {
                    var assertion = new Assertion(subject, _predicate, object, options);
                    this.assertions.add(assertion);
                    this.persistAssertion(assertion);
                }

            } else {
                console.error("Impossible to create an incomplete assertion.", arguments);
            }
            //console.log("created: ", assertion);

            return assertion;
        };

        /**
         * Persist an assertion to localState for it "session" state layer (aka localStorage)
         * If the session layer is empty, the assertion is removed
         */
        State.prototype.persistAssertion = function (assertion) {
            //console.log("State.persistAssertion", assertion);
            if (!$localStorage.localState) {
                $localStorage.localState = {}
            }
            if (!$localStorage.localState.assertions) {
                $localStorage.localState.assertions = {}
            }
            var localState = $localStorage.localState;
            //console.log("persistAssertion", assertion, assertion.layer);
            if (assertion.layer === "session") {
                if (localState) {
                    var json = assertion.toJSON();
                    if (json) {
                        localState.assertions[assertion.id()] = json;
                    } else {
                        delete localState.assertions[assertion.id()];
                    }
                }
            }
        };
        State.prototype.UnpersistAssertions = function (_assertions) {
            // todo: refactor: Initialising the localStorage this way is not elegant.... use .ensure() pattern
            if (!$localStorage.localState) {
                $localStorage.localState = {}
            }
            if (!$localStorage.localState.assertions) {
                $localStorage.localState.assertions = {}
            }
            var localState = $localStorage.localState;

            //console.log("State.UnpersistAssertions", _assertions);
            var assertions = _assertions;
            if (!angular.isArray(assertions)) assertions = [assertions];

            angular.forEach(assertions, function (assertion) {
                //console.log("persistAssertion", assertion, assertion.layer);
                if (assertion.layer === "session") {
                    delete localState.assertions[assertion.id()];
                }
            });
        };

        State.prototype.negate = function (criterias) {
            var self = this;

            if (criterias.layer) throw "Cannot specify layer when negating assertions";
            if (criterias.parent) throw "Cannot specify parent when negating assertions";

            var groupedAssertions = this.assertions
                .filter(criterias)
                .groupByTripple();

            //console.log("groupedAssertions", groupedAssertions);

            angular.forEach(groupedAssertions, function (assertions) {
                var topAssertion = assertions.sortByWeight().top();
                // First, we check wether the top assertion is already negative
                if (topAssertion.value() !== false) {
                    // Then we check if the topAssertion is on the static world layer
                    if (topAssertion.layer === "world") {
                        // If so, we create a new assertion on top to negate it
                        var newAssertion = topAssertion.clone();
                        if (self.currentLayer === "world") {
                            newAssertion.layer = "session";
                        } else {
                            newAssertion.layer = self.currentLayer;
                        }
                        newAssertion.parent = null;
                        newAssertion.value(false);
                        self.assertions.add(newAssertion);
                        //console.log("---------- negate2 ----> created new", newAssertion);
                        self.persistAssertion(newAssertion);
                    } else {
                        // Now we test if we have an underlying layer with a value,
                        // is so, we re-assign a "false" value to the current assertion
                        // if not, we can simply delete the assertion
                        var valueExistsUnder = assertions.count() > 1;

                        if (valueExistsUnder) {
                            topAssertion.value(false);
                            self.persistAssertion(topAssertion);
                            //console.log("---------- negate2 ----> reassigned to false", topAssertion);
                        } else {
                            self.assertions.remove(topAssertion);
                            self.UnpersistAssertions(topAssertion);
                            //console.log("---------- negate2 ----> Discarded", topAssertion);
                        }
                    }
                } else {
                    //console.log("---------- negate2 ----> already negative", topAssertion);
                }
            });


        };
        /*



         console.log("wasInAssertions", wasInAssertions);
         angular.forEach(wasInAssertions, function (assertion) {
         });

         */


        State.prototype.step = function (increment) {
            var count = 0;
            var stepCount = this.resolveValue({
                subject: "story",
                predicate: "has",
                object: "steps"
            });
            if (stepCount) {
                if (typeof stepCount === "number") {
                    count = stepCount;
                }
            }

            if (increment && typeof(increment) === "number") {
                count = count + increment;
                var story = this.thing("Story");
                var steps = this.thing("Steps");
                var has = this.predicate("has");
                this.createAssertion(story, has, steps, {
                    value: count
                });
                //console.log("====>", assertion);
            }

            return count;
        };

        return new State();


    }
);

