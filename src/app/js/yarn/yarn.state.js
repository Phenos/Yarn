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
        }

        State.prototype.getPredicates = function(tokens) {
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
            // If a thing was not supplied as a starting point, use the first token as the thing id
            if (!thing) {
                var tokens = expression.split(".");
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

        State.prototype.html = function () {
            var html = [];

            html.push("<div class='assertions'>");
            this.assertions.forEach(function (assertion) {
                html.push("<div class='assertion'>");
                html.push("<span class='subject " + getTypeFromThingOrValue(assertion.subject) + "'>");
                html.push(getStringFromThingOrValue(assertion.subject));
                html.push("</span><span class='predicate'>");
                html.push(getStringFromThingOrValue(assertion.predicate));
                html.push("</span><span class='object " + getTypeFromThingOrValue(assertion.object) + "'>");
                html.push(getStringFromThingOrValue(assertion.object));
                html.push("</span></div>");
            });
            html.push("</div><hr /><div>");
            this.actionHandlers.forEach(function (actionHandler) {
                html.push("<div class='assertion'>");
                html.push("<span class='subject " + getTypeFromThingOrValue(actionHandler.subject) + "'>");
                html.push(getStringFromThingOrValue(actionHandler.subject));
                html.push("</span><span class='predicate'>");
                html.push(getStringFromThingOrValue(actionHandler.predicate));
                html.push("</span><span class='object " + getTypeFromThingOrValue(actionHandler.object) + "'>");
                html.push(getStringFromThingOrValue(actionHandler.object));
                html.push("</span>+<span class='doReference " + getTypeFromThingOrValue(actionHandler.do) + "'>");
                html.push(getStringFromThingOrValue(actionHandler.do));
                html.push("</span></div>");
            });
            html.push("</div>");

            function getStringFromThingOrValue(obj) {
                var value;
                if (typeof obj === "undefined") {
                    value = "[undefined]";
                } else if (typeof obj === "object") {
                    value = obj.label || obj.id;
                    console.log('--------->>>>-', value, obj);
                } else {
                    value = obj;
                }
                return value;
            }

            function getTypeFromThingOrValue(obj) {
                var value;
                var type;
                if (typeof obj === "undefined") {
                    value = "isUndefined";
                } else if (typeof obj === "object") {
                    value = "isThing"
                } else {
                    type = typeof obj;
                    type = "is" + type.substr(0,1).toUpperCase() + type.substr(1);
                    value = type;
                }
                return value;
            }

            return html.join("");
        };

        /**
         * Get or create a new thing
         * @param _id
         */
        State.prototype.thing = function (_id) {
            var thing;
            var id = _id.toLowerCase();

            if (!id)
                throw("Things must have an id");
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
                    // Create a new assertion
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
         * @returns {*}
         */
        State.prototype.setAssertion = function (subject, predicate, object) {
            var assertion;
            var foundAssertions;

            if (predicate && subject) {
                // Look for an existing assertion
                foundAssertions = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate &&
                        assertion.object === object) {
                        foundAssertions.push(assertion);
                    }
                });
                if (foundAssertions[0]) {
                    assertion = foundAssertions[0].object;
                } else {
                    // Create a new assertion
                    assertion = new Assertion(subject, predicate, object, this);
                    this.assertions.push(assertion);
                }
            } else {
                console.warn("Impossible to create assertion without at least a subject and a predicate.")
            }

            return assertion;
        };

        State.prototype.removeAssertions = function (subject, predicate, object) {
            // Look for matching assertions
            // todo: use built indexes instead of itterating trough all predicates
            this.assertions = this.assertions.filter(function (assertion) {
                var keep = true;
                if (subject && Object.is(object, assertion.subject)) keep = false;
                if (predicate && Object.is(predicate, assertion.predicate)) keep = false;
                if (object && Object.is(object, assertion.object)) keep = false;
                return keep;
            });
            return this;
        };


        // TODO: Rename to getAssertions and have a version that return 1 item and need an objet argument
        State.prototype.getAssertion = function (subject, predicate) {
            var assertion;
            var foundAssertions;

            if (predicate && subject) {
                // Look for an existing assertion
                foundAssertions = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.subject === subject &&
                        assertion.predicate === predicate) {
                        foundAssertions.push(assertion);
                    }
                });
            } else {
                console.warn("Impossible to find assertion without at least a subject and a predicate.")
            }

            return foundAssertions;
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

