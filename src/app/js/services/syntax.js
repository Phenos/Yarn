/**
 * A syntax of natural language that be use to define a predicate
 * @name Syntax
 * @param {String} text The text token representing this syntax
 * @param {Predicate} predicate The predicate to which this syntax is a synonym of
 * @param {boolean} isPositive Specify if this syntax is a positive or negative predicate
 * @constructor
 */
yarn.factory('Syntax', function SyntaxService() {

    function Syntax(text, predicate, isPositive) {
        var self = this;
        self.text = text;
        self.predicate = predicate;
        self.isPositive = true;
        if (!angular.isUndefined(isPositive)) {
            self.isPositive = isPositive;
        }
    }

    return Syntax;
});

