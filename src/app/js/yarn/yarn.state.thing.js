(function () {
    "use strict";

    angular.module('yarn').factory('Thing', ThingService);

    // todo: BAD DESIGN: Major refactoring, This class should not need to use the "state" parent object
    function ThingService() {

        /**
         * A "thing" in the graph
         * @param _id
         * @constructor
         */
        function Thing(_id, state) {
            this.id =_id.toLowerCase();
            this.state = state;
        }

        /**
         * Get an assertion, returns itself or the object of the assertion found.
         * @type {Function}
         */
        Thing.prototype.getAssertion = function (predicate) {
            return this.state.getAssertion(this, predicate);
        };

        Thing.prototype.setAssertion = function (predicate, object) {
            this.state.setAssertion(this, predicate, object);
            return this;
        };

        Thing.prototype.removeAssertions = function (predicate, object) {
            this.state.removeAssertions(this, predicate, object);
            return this;
        };

        /**
         * Return this thing as text (string)
         * @returns {*}
         */
        Thing.prototype.text = function () {
            return this.id;
        };

        Thing.prototype.resolve = function (expression) {
            var thingInContext = this;
            var tokens = expression.split(".");
            var predicates = this.state.getPredicates(tokens);
            var allResolved = [];
            predicates.forEach(function (predicate, index, predicates) {
                //console.log('context', context);
                var assertions;
                //console.log('predicate', predicate);
                if (thingInContext) {
                    assertions = thingInContext.getAssertion(predicate);
                    if (assertions.length) {
                        //console.log('assertion', assertion[0].object);
                        // If it is the last predicate, return multiple value
                        // todo: allow to broader search (not just collection on the last branch)
                        if (predicates.length === index + 1) {
                            assertions.forEach(function (assertion) {
                                allResolved.push(assertion.object);
                            });
                            thingInContext = assertions[0];
                        } else {
                            thingInContext = assertions[0].object;
                        }
                    } else {
                        //console.log('context nulled');
                        thingInContext = null;
                    }
                }
            });
            return allResolved;
        };

        Thing.prototype.resolveValue = function (expression) {
            this.resolve(expression);

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


        return Thing;
    }

})();

