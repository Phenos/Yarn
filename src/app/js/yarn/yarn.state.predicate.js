(function () {
    "use strict";

    angular.module('yarn').factory('Predicate', PredicateService);

    function PredicateService() {

        /**
         * A type of predicate used to make assertions
         * @param id
         * @constructor
         */
        function Predicate(_id, type, yarn) {
            var id = _id.toLowerCase();
            this.id = id;
            this.label = id;
            this.type = type;
    
            /**
             * Define a new syntax for this predicate
             * @param text
             * @returns {Predicate}
             */
            this.syntax = function (text) {
                this.label = text;
                // todo: refctor this method is calling the parentdirectly instead of using a service or emmiting
                // This prevents the method from being put on the prototype
                yarn.syntax(this, text);
                return this;
            }

        }


        /**
         * Filter an array of things depending if they have a matching predicate and object
         * @param things
         * @param object
         * @returns {Array}
         * Usage:
         *  InventoryItemsInsideChest = predicateIsA.filter(ItemsInsideChest, 'InventoryItem');
         */
        // todo: refactor this method to work from a set/list of things
        Predicate.prototype.filterThings = function (things, object) {
            var self = this;
            var filtered = [];
            if (angular.isArray(things)) {
                things.forEach(function (thing) {
                    var assertions = thing.getAssertion(self);
                    if (object) {
                        assertions.forEach(function (assertion) {
                            if (assertion.object === object) {
                                filtered.push(thing);
                            }
                        });
                    } else {
                        if (assertions.length) filtered.push(thing);
                    }
                });
            }
            return filtered;
        };

        return Predicate;
    }

})();

