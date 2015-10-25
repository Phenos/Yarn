(function () {
    "use strict";

    BigMess.State = State;
    function State() {
        this.assertions = [];
        this.things = {};
        this.predicates = {};
        this.syntaxes = {};
    }


    /**
     * Get or create a new thing
     * @param id
     */
    State.prototype.thing = function (id) {
        var thing;

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
     * @param id
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
     * Get or create a new assertion and the objects associated to it
     * @param subject
     * @param predicate
     * @param object
     */
    State.prototype.assertion = function (subjectId, predicateId, objectId) {
        var subject;
        var predicate;
        var object;
        var assertion;
        var foundAssertions;

        if (!subjectId)
            throw("Assertion subject must have an id");

        subject = this.t(subjectId);

        if (predicateId) {
            predicate = this.p(predicateId);


            if (objectId) {
                // Create a new assertion
                object = this.t(objectId);
                assertion = new Assertion(subject, predicate, object, this);
                this.assertions.push(assertion);
                return this;
            } else {
                // Look for an existing assertion
                foundAssertions = [];
                // todo: use built indexes instead of itterating trough all predicates
                this.assertions.forEach(function (assertion) {
                    if (assertion.subject === subject && assertion.predicate === predicate) {
                        foundAssertions.push(assertion);
                    }
                });
                if (foundAssertions[0]) {
                    return foundAssertions[0].object;
                }
            }
        }


        // todo: check for duplicate
        this.assertions.push(assertion);

        return assertion;
    };

    /**
     * Get or create a new type of predicate
     * @param id
     */
    State.prototype.predicate = function (id) {
        var predicate;

        if (!id)
            throw("Assertions must have an id");

        predicate = this.predicates[id];
        if (!predicate) {
            predicate = new Predicate(id, this);
            this.predicates[id] = predicate;
        }
        return predicate;
    };

// Shorthands for main functions
    State.prototype.t = State.prototype.thing;
    State.prototype.a = State.prototype.assertion;
    State.prototype.p = State.prototype.predicate;


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
    function Thing(id, bigMess) {
        this.id = id;

        /**
         * Get or set an assertion, returns itself or the object of the assertion found.
         * @type {Function}
         */
        this.a = this.assertion = function (predicateId, thingId) {
            var object = bigMess.assertion(this.id, predicateId, thingId);
            if (thingId) {
                return this;
            } else {
                return object;
            }
        };

        /**
         * Return this thing as text (string)
         * @returns {*}
         */
        this.text = function () {
            return this.id;
        }
    }

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
    function Predicate(id, bigMess) {
        this.id = id;

        /**
         * Define a new syntax for this predicate
         * @param text
         * @returns {Predicate}
         */
        this.syntax = function (text) {
            bigMess.syntax(this, text);
            return this;
        }
    };

})();

