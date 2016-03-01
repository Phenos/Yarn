yarn.service('state', function ($localStorage,
                                Assertion,
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

        State.prototype.restoreFromLocalState = function () {
            var self = this;
            var localAssertions = ($localStorage.localState &&
                $localStorage.localState.assertions) || {};
            console.log("Restoring assertion from localState", localAssertions);
            angular.forEach(localAssertions, function (assertion) {
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

                var newAssertion = self.createAssertion(
                    self.thing(assertion.subject),
                    self.predicate(assertion.predicate),
                    object, {
                        value: assertion.value
                    }
                );
                //console.log("Restored:", assertion, newAssertion);
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

        State.prototype.resolveAll = function resolveAll(criterias) {
            var foundObjects = [];
            if (criterias && (criterias.subject && criterias.predicate) || (criterias.object && criterias.predicate)) {
                var foundObjectsSets = {};
                //console.log("length.... ", this.assertions.all().length);

                // Exclused parented assertions unless already specified
                if (angular.isUndefined(criterias.parent)) criterias.parent = null;
                var assertions = this.assertions.find(criterias);

                // Sort assertion by layerSetup
                assertions = assertions.sort(function (a, b) {
                    var aPriority = layerSetup.indexOf(a.layer);
                    var bPriority = layerSetup.indexOf(b.layer);
                    return aPriority > bPriority;
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

            }
            //console.log("foundObjects", foundObjects);
            return foundObjects;
        };

        State.prototype.resolveOne = function (criterias) {
            var objs = this.resolveAll(criterias);
            return objs.length && objs[0];
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
            var self = this;

            var options = _options || {};
            //console.log("State.createAssertion", subject, predicate, object, options);

            // The set of assertions to negate first
            // First, verify that we have at least a subject and a predicate
            // Otherwise the assertions would not assert anything

            // If not layer is provided, we set the "currentLayer"
            if (!options.layer) {
                options.layer = this.currentLayer;
            }

            if (subject && predicate) {

                // Look for existing assertions that match the criteria
                // IMPORTANT: a isUnique predicate mean that we still keep negated assertions.
                // Instead we negate all the ones we dont need anymore
                if (predicate.uniqueSubject) {

                    // Find exquivalent assertions to be negated
                    var assertionsToNegate = this.assertions.find({
                        subject: subject.id,
                        predicate: predicate.id,
                        layer: this.currentLayer,
                        parent: null
                    });

                    assertionsToNegate.forEach(function (assertion) {
                        self.negate(assertion);
                    });

                } else {
                    /*
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
                     */
                }

                var assertion = new Assertion(subject, predicate, object, options);
                this.assertions.add(assertion);

                this.persistAssertion(assertion);
            } else {
                console.warn("Impossible to create assertion without at least a subject and a predicate.")
            }

            return assertion;
        };

        /**
         * Persist an assertion to localState for it "session" state layer (aka localStorage)
         * If the session layer is empty, the assertion is removed
         */
        State.prototype.persistAssertion = function (assertion) {
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
            // todo: refactor: use a service instead of state.thing
            // ex.:   var story = things("Story")
            // ex.:   var hasStepped = predicates("hasStepped")
            var hasSteppedCount = this.resolveOne({
                subject: "story",
                predicate: "hasStepped"
            });
            if (hasSteppedCount) {
                if (typeof hasSteppedCount === "number") {
                    count = hasSteppedCount;
                }
            }

            if (increment && typeof(increment) === "number") {
                count = count + increment;
                var story = this.thing("Story");
                var hasStepped = this.predicate("hasStepped");
                var assertion = this.createAssertion(story, hasStepped, count);
                console.log("====>", assertion);
            }

            return count;
        };

        return new State();


    }
)
;

