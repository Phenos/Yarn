yarn.service("Assertions", function (assert,
                                     match) {

    function Assertions(assertions) {
        this._all = [];
        if (angular.isArray(assertions)) {
            this._all = assertions;
        }
    }

    Assertions.prototype.all = function () {
        return this._all.slice();
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
     * @param {Assertion} assertions One assertion or array of assertions to be added
     * @returns {Array} An array of added assertions
     */
    Assertions.prototype.add = function (assertions) {
        var self = this;
        var _assertions = ensureArray(assertions);
        var addedAssertions = [];

        _assertions.forEach(function (__assertion) {
            if (__assertion) {
                self._all.push(__assertion);
                addedAssertions.push(__assertion);
            }
        });
        return addedAssertions;
    };

    Assertions.prototype.remove = function (assertion) {
        var self = this;
        var assertions = ensureArray(assertion);
//        console.log("Assertion>", self._all.length);
        assertions.forEach(function (toDelete) {
            self._all.forEach(function (_assertion, index) {
                if (_assertion === toDelete) {
                    self._all.splice(index, 1);
                }
            })
        });
        return this;
    };

    Assertions.prototype.removeLayer = function (layer) {
        var undef = void 0;
        var assertions = this.find(assert(undef, undef, undef, {
            layer: layer,
            parent: undef
        }));
//        console.log("found: ", assertions);
        this.remove(assertions);
        return this;
    };


    Assertions.prototype.find = function (_assert) {
        var self = this;
        var matches = [];
        self._all.forEach(function (assertion) {
            if (match(assertion, _assert)) {
                matches.push(assertion);
            }
        });
        return matches;
    };

    Assertions.prototype.filter = function (_assert) {
        return new Assertions(this.find(_assert));
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
            if (!trippleGroups[key]) {
                trippleGroups[key] = [];
            }
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

    function ensureArray(assertion) {
        return (angular.isArray(assertion)) ? assertion : [assertion];
    }

    return Assertions;
});

