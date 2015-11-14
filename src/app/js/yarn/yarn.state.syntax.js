(function () {
    "use strict";

    angular.module('yarn').factory('Syntax', SyntaxService);

    function SyntaxService() {

        /**
         * A syntax of natural language that be use to define a predicate
         * @param text
         * @param predicate
         * @constructor
         */
        function Syntax(text, predicate) {
            this.text = text;
            this.predicate = predicate;
        }

        return Syntax;
    }

})();

