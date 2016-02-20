(function () {
    "use strict";

    angular.module('yarn').factory('State', StateService);

    function StateService(Assertion, ActionHandler, Thing, Syntax, Predicate) {

        function State() {
            this.assertions = [];
            this.actionHandlers = [];
            this.things = {};
            this.predicates = {};
            this.syntaxes = {};
            // todo: Make configurable
            // todo: Layers should be instances of Layer class
            // Top layers have priority when resolving assertions
            this.layers = [{
                id: "session",
                static: false
            }, {
                id: "world",
                static: true
            }];
            // todo: ability to set current layer by it's id
            this.layerSetup = ["world", "session"];
            this.currentLayer = "world";
            this.localState = null;
        }

        State.prototype.restoreFromLocalState = function (localState) {
            var self = this;
            this.localState = localState;
            angular.forEach(this.localState.assertions, function (assertion) {
                var newAssertion;
                newAssertion = self.setAssertion(
                    self.thing(assertion.subject),
                    self.predicate(assertion.predicate),
                    self.thing(assertion.object),
                    assertion.value
                );
                console.log("Restoring assertion from localState", assertion, newAssertion);

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

        State.prototype.resolve = function (expression, _thing) {
            var thing = _thing;
            var allResolved = [];
            var tokens = expression.split(".");
            // If a thing was not supplied as a starting point, use the first token as the thing id
            if (!thing) {
                var thingId = tokens.shift();
                if (thingId) thing = this.thing(thingId);
            }
            if (thing && tokens.length) {
                allResolved = thing.resolve(tokens.join("."));
            }
            return allResolved;
        };


        State.prototype.resolveValue = function (expression) {
            var value;
            var resolved = this.resolve(expression);
            //console.log('State.resolved', resolved);
            if (resolved.length) value = resolved[0];
            return value;
        };

        /**
         * Get or create a new thing
         * @param _id
         */
        State.prototype.thing = function (_id) {
            var thing;
            if (!_id) return null;

            var id = _id.toLowerCase();

            thing = this.things[id];
            if (!thing) {
                thing = new Thing(id, this);
                this.things[id] = thing;
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
         * Get a new Action Handler
         * @param subject
         * @param predicate
         * @param object
         * @param doReference
         * @returns {*}
         */
        State.prototype.setActionHandler = function (subject, predicate, object, doReference) {
            var actionHandler;
            var foundActionHandler;

            if (predicate && subject) {
                // Look for an existing assertion
                foundActionHandler = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.actionHandlers.forEach(function (actionHandler) {
                    if (actionHandler.subject === subject &&
                        actionHandler.predicate === predicate &&
                        actionHandler.object === object) {
                        foundActionHandler.push(actionHandler);
                    }
                });
                if (foundActionHandler[0]) {
                    actionHandler = foundActionHandler[0].object;
                } else {
                    actionHandler = new ActionHandler(subject, predicate, object, doReference);
                    this.actionHandlers.push(actionHandler);
                }
            } else {
                console.warn("Impossible to create an Action Handler' type of assertion without at least a subject and a predicate.")
            }

            return actionHandler;
        };

        /**
         * Get a new assertion
         * @param subject
         * @param predicate
         * @param object
         * @param value
         * @returns {*}
         */
        State.prototype.setAssertion = function (subject, predicate, object, value) {
            var assertion;
            var foundAssertions;
            var valueOveride = true;
            if (value === false) valueOveride = false;

            if (predicate && subject) {
                // Look for an existing assertion
                foundAssertions = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.predicate.uniqueSubject) {
                        if (assertion.subject === subject &&
                            assertion.predicate === predicate) {
                            foundAssertions = [assertion];
                        }
                    } else {
                        if (assertion.subject === subject &&
                            assertion.predicate === predicate &&
                            assertion.object === object) {
                            foundAssertions.push(assertion);
                        }
                    }
                });
                if (foundAssertions[0]) {
                    assertion = foundAssertions[0];
                    // If it is an assertion predicate whish is unique per subject
                    // override with the project object reference
                    if (assertion.predicate.uniqueSubject) {
                        //debugger;
                        assertion.object = object;
                    }
                } else {
                    // Create a new assertion and set it to "true" for the current state layer
                    assertion = new Assertion(subject, predicate, object);
                    this.assertions.push(assertion);
                }
                assertion.set(valueOveride, this.currentLayer);

                // If the current layer is for "session", store the assertion in the
                // localStorage provider
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
        State.prototype.persistAssertion = function(assertion) {
            if (this.localState) {
                var json = assertion.toJSON(this.layerSetup, "session");
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
            if (angular.isArray(assertion)) {
                assertions = assertion;
            } else if (angular.isObject(assertion)) {
                assertions = [assertion]
            }
            assertions.forEach(function (assertion) {
                assertion.set(false, self.currentLayer);
                self.persistAssertion(assertion);
            });

        };

        // todo: Take in account layers
        // todo: Handle case when assertion was persisted in localStorage
        // todo: Handle case when asseetion has uniqueSubject predicate
        State.prototype.removeAssertions = function (subject, predicate, object, layerId) {
            // Look for matching assertions
            // todo: use built indexes instead of itterating trough all predicates
            this.assertions = this.assertions.filter(function (assertion) {
                var keep = true;
                if (subject && Object.is(object, assertion.subject)) keep = false;
                if (predicate && Object.is(predicate, assertion.predicate)) keep = false;
                if (object && Object.is(object, assertion.object)) keep = false;
                if (layerId) {
                    angular.forEach(assertion.states, function (state) {
                        // If a layerId has been provided and it matches
                        // that state
                        if (state.layerId === layerId) {

                        }
                    });
                }
                return keep;
            });
            return this;
        };

        // todo: Take in account layers
        // todo: Handle case when assertion was persisted in localStorage
        // todo: Handle case when asseetion has uniqueSubject predicate
        State.prototype.removeAssertionsLayer = function (layerId) {
            var self = this;
            // Look for matching assertions
            // todo: use built indexes instead of itterating trough all predicates
            if (layerId) {
                angular.forEach(this.assertions, function (assertion) {
                    assertion.removeState(layerId);
                    self.persistAssertion(assertion);
                });
            }
            return this;
        };

        // TODO: Rename to getAssertions and have a version that return 1 item and need an objet argument
        /**
             * Get the topmost assertion from layered states
             * @param subject
         * @param predicate
         * @returns {Array}
         */
        State.prototype.getAssertion = function (subject, predicate) {
            var self = this;
            var assertion;
            var foundAssertions = [];

            if (predicate && subject) {
                // Look for an existing assertion
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate) {
                        if (assertion.value(self.layerSetup) === true) {
                            foundAssertions.push(assertion);
                        }
                    }
                });
            } else {
                console.warn("Impossible to find assertion without at least a subject and a predicate.")
            }

            return foundAssertions;
        };
        // TODO: Add support for getting assertion for a specific layer
        State.prototype.getAssertionByLayer = function (subject, predicate, layer) {
        };

        State.prototype.getActionHandler = function (subject, predicate, object) {
            var foundActionHandler;

            if (predicate && subject && object) {
                // Look for an existing assertion
                // todo: use built indexes instead of itterating trough all predicates
                this.actionHandlers.forEach(function (actionHandler) {
                    if (actionHandler.subject === subject &&
                        actionHandler.predicate === predicate &&
                        actionHandler.object === object) {
                        foundActionHandler = actionHandler;
                    }
                });
            } else {
                console.warn("Impossible to ensure a single actionHandler without at least a subject, predicate and object.")
            }

            return foundActionHandler;
        };


        /**
         * Get or create a new type of predicate
         * @param _id
         */
        State.prototype.predicate = function (_id, type) {
            var id = _id.toLowerCase();
            var predicate;
            var syntax;

            if (!id)
                throw("Assertions must have an id");

            // Resolve the predicate from the syntax
            syntax = this.syntaxes[id];
            if (syntax) predicate = syntax.predicate;

            if (!predicate) {
                predicate = new Predicate(id, type, this);
                //console.log("Created new predicate", predicate);
                this.predicates[id] = predicate;
                this.syntaxes[id] = new Syntax(id, predicate);
            }
            return predicate;
        };

        return State;
    }

})();

