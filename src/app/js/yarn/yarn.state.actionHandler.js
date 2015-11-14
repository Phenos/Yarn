(function () {
    "use strict";

    angular.module('yarn').factory('ActionHandler', ActionHandlerService);

    function ActionHandlerService() {

        /**
         * An assertion of an action or an event about things in the graph
         * @param subject
         * @param predicate
         * @param object
         * @constructor
         */
        function ActionHandler(subject, predicate, object, doReference) {
            this.subject = subject;
            this.predicate = predicate;
            this.object = object;
            this.do = doReference;
        }


        return ActionHandler;
    }

})();

