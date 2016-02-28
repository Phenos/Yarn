yarn.service("Assertions", function() {

    function Assertions() {
        this._all = [];
    }

    Assertions.prototype.all = function () {
        return this._all;
    };

    Assertions.prototype.get = function (id) {
        var assertion;
        for (var i = 0; i < this._all.length; i++) {
            assertion = this._all[i];
            if (assertion.id() === id) break;
        }
        return assertion;
    };

    Assertions.prototype.count = function () {
        return this._all.length;
    };

    /**
     * Add an assertion... if an identical assertion with a different value is added.
     * The old one is kept and updated.
     * @param assertion
     * @returns {Array}
     */
    Assertions.prototype.add = function (assertion) {
        var self = this;
        var assertions = [];
        var addedAssertions = [];
        var existingAssertion;
        if (!existingAssertion) {
            assertions = ensureArray(assertion);
            assertions.forEach(function (assertion) {
                if (assertion) {
                    existingAssertion = self.get(assertion.id());
                    if (existingAssertion) {
                        existingAssertion.value(assertion.value());
                        addedAssertions.push(existingAssertion);
                    } else {
                        self._all.push(assertion);
                        addedAssertions.push(assertion);
                    }
                }
            });
        }
        return addedAssertions;
    };

    Assertions.prototype.remove = function (assertion) {
        var self = this;
        var assertions = ensureArray(assertion);
        assertions.forEach(function (toDelete) {
            self._all.forEach(function (assertion, index, all) {
                if (assertion === toDelete) delete all[index];
            })
        });
        return this;
    };

    Assertions.prototype.removeLayer = function (layer) {
        var assertions = this.assertions.find({
            layer: layer
        });
        this.assertions.remove(assertions);
        return this;
    };


    Assertions.prototype.find = function (criterias) {
        var self = this;
        var matches = [];
        self._all.forEach(function (assertion) {
            if (match(assertion, criterias)) matches.push(assertion);
        });
        return matches;
    };

    // todo: Too complex ... should be simplified or cut appart
    function match(assertion, criterias) {
        var matchedValue;
        var isMatch = true;

        if (!assertion) isMatch = false;

        if (!angular.isUndefined(criterias.subject)) {
            matchedValue = null;
            if (assertion.subject !== null) matchedValue = (assertion.subject && assertion.subject.id) || "";
            if (matchedValue !== criterias.subject) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(criterias.predicate)) {
            matchedValue = null;
            if (assertion.predicate !== null) matchedValue = (assertion.predicate && assertion.predicate.id) || "";
            if (matchedValue !== criterias.predicate) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(criterias.object)) {
            matchedValue = null;
            if (assertion.object !== null) matchedValue = (assertion.object && assertion.object.id) || "";
            if (matchedValue !== criterias.object) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(criterias.filter)) {
            matchedValue = assertion.filter;
            if (matchedValue !== criterias.filter) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(criterias.layer)) {
            matchedValue = assertion.layer;
            if (matchedValue !== criterias.layer) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(criterias.value)) {
            matchedValue = assertion.value;
            if (matchedValue !== criterias.value) isMatch = false;
        }

        return isMatch;
    }

    function ensureArray(assertion) {
        return (angular.isArray(assertion)) ? assertion : [assertion];
    }

    return Assertions;
});

