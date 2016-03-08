yarn.factory('Predicate', function PredicateService(syntaxes) {

    /**
     * A type of predicate used to make assertions
     * @param _id
     * @param yarn
     * @constructor
     */
    // todo: BAD DESIGN: Major refactoring, This class should not need to use the "yarn" parent object
    function Predicate(_id) {
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
            // todo: refactor this method is calling the parentdirectly instead of using a service or emmiting
            // This prevents the method from being put on the prototype
            syntaxes.set(text, this);
            return this;
        };

        /**
         * Define the predicate as the negative form of another
         * @param predicate
         * @returns {Predicate}
         */
        this.isNegativeOf = function (predicate) {
            this.negative = predicate;
            return this;
        };

    }

    return Predicate;
});
