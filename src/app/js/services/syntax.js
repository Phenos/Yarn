(function () {

    yarn.factory('Syntax', SyntaxService);

    function SyntaxService() {

        /**
         * A syntax of natural language that be use to define a predicate
         * @param text
         * @param predicate
         * @constructor
         */
        function Syntax(text, predicate, isPositive) {
            this.text = text;
            this.predicate = predicate;
            this.isPositive = true;
            if (!angular.isUndefined(isPositive)) this.isPositive = isPositive;
        }

        return Syntax;
    }

})();

