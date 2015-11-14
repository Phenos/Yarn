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
                yarn.syntax(this, text);
                return this;
            }
        }

        return Predicate;
    }

})();

