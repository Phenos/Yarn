(function () {
    "use strict";

    angular.module('yarn').factory('Assertion', AssertionService);

    function AssertionService() {

        /**
         * An assertion about things in the graph
         * @param subject
         * @param predicate
         * @param object
         * @constructor
         */
        function Assertion(subject, predicate, object) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
        }

        return Assertion;
    }

})();

