yarn.factory('Predicate', function PredicateService() {

    /**
     * A type of predicate used to make assertions
     * @param _id
     * @param yarn
     * @constructor
     */
    // todo: BAD DESIGN: Major refactoring, This class should not need to use the "yarn" parent object
    function Predicate(_id, yarn) {
        var id = _id.toLowerCase();
        this.id = id;
        this.label = id;
        this.uniqueSubject = false;

        /**
         * Define a new syntax for this predicate
         * @param text
         * @returns {Predicate}
         */
        this.syntax = function (text) {
            this.label = text;
            // todo: refactor this method is calling the parentdirectly instead of using a service or emmiting
            // This prevents the method from being put on the prototype
            yarn.syntax(this, text);
            return this;
        }

    }

    Predicate.prototype.isUniqueSubject = function (value) {
        var returnValue;
        if (angular.isUndefined(value)) {
            returnValue = this.uniqueSubject;
        } else {
            this.uniqueSubject = value;
            returnValue = this;
        }
        return returnValue;
    };

    return Predicate;
});
