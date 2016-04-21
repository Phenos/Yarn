yarn.service("match", function () {

    function match(assertion, assert) {
        var isMatch = true;

        if (!assertion) {
            isMatch = false;
        }

        if (isMatch && angular.isDefined(assert.subject)) {
            isMatch = assertion.subject === assert.subject;
        }

        if (isMatch && angular.isDefined(assert.predicate)) {
            isMatch = assertion.predicate === assert.predicate;
        }

        if (isMatch && angular.isDefined(assert.object)) {
            isMatch = assertion.object === assert.object;
        }

        if (isMatch && angular.isDefined(assert.layer)) {
            isMatch = assertion.layer === assert.layer;
        }

        if (isMatch && angular.isDefined(assert.value)) {
            isMatch = assertion.value() === assert.value;
        }

        if (isMatch && angular.isDefined(assert.parent)){
            isMatch = assertion.parent === assert.parent;
        }

        return isMatch;
    }

    return match;
});