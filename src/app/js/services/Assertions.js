yarn.service("Assertions", function () {

    function Assertions(assertions) {
        this._all = [];
        if (angular.isArray(assertions)) this._all = assertions;
    }

    Assertions.prototype.all = function () {
        return this._all;
    };

    Assertions.prototype.get = function (id) {
        var found;
        var assertion;
        for (var i = 0; i < this._all.length; i++) {
            assertion = this._all[i];
            if (assertion.id() === id) {
                found = assertion;
                break;
            }
        }
        return found;
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
        var assertions = ensureArray(assertion);
        var addedAssertions = [];

        assertions.forEach(function (assertion) {
            //var existingAssertion;
            if (assertion) {
                //existingAssertion = self.get(assertion.id());
                ////console.log(assertion.id());
                ////console.log("existingAssertion", existingAssertion);
                //if (existingAssertion) {
                //    existingAssertion.value(assertion.value());
                //    addedAssertions.push(existingAssertion);
                //} else {
                //    self._all.push(assertion);
                //    addedAssertions.push(assertion);
                //}
                self._all.push(assertion);
                addedAssertions.push(assertion);
            }
        });
        return addedAssertions;
    };

    Assertions.prototype.remove = function (assertion) {
        var self = this;
        var deleted;
        var assertions = ensureArray(assertion);
        //console.log("Assertion>", self._all.length);
        assertions.forEach(function (toDelete) {
            self._all.forEach(function (assertion, index) {
                if (assertion === toDelete) {
                    deleted = self._all.splice(index, 1);
                }
            })
        });
        return this;
    };

    Assertions.prototype.removeLayer = function (layer) {
        var assertions = this.find({
            layer: layer
        });
        this.remove(assertions);
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

    Assertions.prototype.filter = function (criterias) {
        return new Assertions(this.find(criterias));
    };

    Assertions.prototype.sortByWeight = function () {
        this._all = this._all.sort(function (a, b) {
            return a.weight() - b.weight();
        });
        return this;
    };

    Assertions.prototype.groupByTripple = function () {
        var trippleGroups = {};
        var trippleGroupsArray = [];
        angular.forEach(this._all, function (assertion) {
            var key = [assertion.object.id, assertion.predicate.id, assertion.object.id].join("-");
            if (!trippleGroups[key]) trippleGroups[key] = [];
            trippleGroups[key].push(assertion);
        });
        angular.forEach(trippleGroups, function (group) {
            trippleGroupsArray.push(
                new Assertions(group)
            );
        });
        return trippleGroupsArray;
    };

    Assertions.prototype.top = function () {
        return this._all[this._all.length - 1];
    };

    // todo: Too complex ... should be simplified or cut appart
    function match(assertion, criterias) {
        var matchedValue;
        var isMatch = true;
        var subject = criterias.subject;
        var predicate = criterias.predicate;
        var object = criterias.object;

        if (!assertion) isMatch = false;

        if (isMatch && !angular.isUndefined(subject)) {
            //console.log("subjec: criterias : ", criterias);
            if (angular.isString(subject)) subject = subject.toLowerCase();
            matchedValue = null;
            if (assertion.subject !== null) matchedValue = (assertion.subject && assertion.subject.id) || "";
            if (matchedValue !== subject) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(predicate)) {
            if (angular.isString(predicate)) predicate = predicate.toLowerCase();
            matchedValue = null;
            if (assertion.predicate !== null) matchedValue = (assertion.predicate && assertion.predicate.id) || "";
            if (matchedValue !== predicate) isMatch = false;
        }

        if (isMatch && !angular.isUndefined(object)) {
            if (angular.isString(object)) object = object.toLowerCase();
            matchedValue = null;
            if (assertion.object !== null) {
                if (typeof(assertion.object) === "object") {
                    matchedValue = (assertion.object && assertion.object.id) || "";
                } else {
                    if (typeof(assertion.object) === "string") {
                        matchedValue = assertion.object.toLowerCase();
                    } else {
                        matchedValue = assertion.object;
                    }
                }
            }
            if (matchedValue !== object) isMatch = false;
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

        if (isMatch && !angular.isUndefined(criterias.parent)) {
            //console.log("parent: criterias : ", criterias);
            matchedValue = (assertion.parent && assertion.parent.id) || null;
            if (matchedValue !== criterias.parent) isMatch = false;
        }

        return isMatch;
    }

    function ensureArray(assertion) {
        return (angular.isArray(assertion)) ? assertion : [assertion];
    }

    return Assertions;
})
;

