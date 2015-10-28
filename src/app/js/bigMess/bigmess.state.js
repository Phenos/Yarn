(function () {
    "use strict";

    BigMess.State = State;
    function State() {
        this.assertions = [];
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
        var self = this;
        var predicates = [];
        var thing = _thing;
        var values = [];
        var value;
        // If a thing was not supplied as a starting point, use the first token as the thing id
        if (!thing) {
            var tokens = expression.split(".");
            var thingId = tokens.shift();
            if (thingId) thing = this.thing(thingId);
        }
        if (thing && tokens.length) {
            value = thing.resolveValue(tokens.join("."));
            if (value) values.push(value);
        } else {
            values.push(this);
        }
        return values;
    };


    State.prototype.resolveValue = function (expression) {
        var value;
        var resolved = this.resolve(expression);
        //console.log('resolved', resolved);
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
        html.push("</div>");

        function getStringFromThingOrValue(obj) {
            var value;
            if (typeof obj === "undefined") {
                value = "";
            } else if (typeof obj === "object") {
                value = obj.label || obj.id;
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
     * @param id
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
     * Get a new assertion and the objects associated to it
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
    /**
     * Get or create a new type of predicate
     * @param id
     */
    State.prototype.predicate = function (_id) {
        var id = _id.toLowerCase();
        var predicate;
        var syntax;

        if (!id)
            throw("Assertions must have an id");

        // Resolve the predicate from the syntax
        syntax = this.syntaxes[id];
        if (syntax) predicate = syntax.predicate;

        if (!predicate) {
            predicate = new Predicate(id, this);
            //console.log("Created new predicate", predicate);
            this.predicates[id] = predicate;
            this.syntaxes[id] = new Syntax(id, predicate);
        }
        return predicate;
    };

    /**
     * An assertion about things in the graph
     * @param subject
     * @param predicate
     * @param object
     * @constructor
     */
    BigMess.Assertion = Assertion;
    function Assertion(subject, predicate, object) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
    }

    /**
     * A "thing" in the graph
     * @param id
     * @constructor
     */
    BigMess.Thing = Thing;
    function Thing(_id, state) {
        var id = _id.toLowerCase();
        this.id = id;
        this.state = state;

        /**
         * Get an assertion, returns itself or the object of the assertion found.
         * @type {Function}
         */
        this.getAssertion = function (predicate) {
            var assertion = state.getAssertion(this, predicate);
            return assertion;
        };

        this.setAssertion = function (predicate, object) {
            state.setAssertion(this, predicate, object);
            return this;
        };

        /**
         * Return this thing as text (string)
         * @returns {*}
         */
        this.text = function () {
            return this.id;
        }
    }

    Thing.prototype.resolveValue = function (expression) {
        var value;
        var context = this;
        var tokens = expression.split(".");
        var predicates = this.state.getPredicates(tokens);
        predicates.forEach(function (predicate) {
            //console.log('context', context);
            var assertion;
            //console.log('predicate', predicate);
            if (context) {
                assertion = context.getAssertion(predicate);
                if (assertion.length) {
                    //console.log('assertion', assertion[0].object);
                    context = assertion[0].object;
                } else {
                    //console.log('context nulled');
                    context = null;
                }
            }
        });
        if (context) value = context;
        return value;
    };


    /**
     * A syntax of natural language that be use to define a predicate
     * @param text
     * @param predicate
     * @constructor
     */
    BigMess.Syntax = Syntax;
    function Syntax(text, predicate) {
        this.text = text;
        this.predicate = predicate;
    }

    /**
     * A type of predicate used to make assertions
     * @param id
     * @constructor
     */
    BigMess.Predicate = Predicate;
    function Predicate(_id, bigMess) {
        var id = _id.toLowerCase();
        this.id = id;
        this.label = id;

        /**
         * Define a new syntax for this predicate
         * @param text
         * @returns {Predicate}
         */
        this.syntax = function (text) {
            this.label = text;
            bigMess.syntax(this, text);
            return this;
        }
    }

})();

