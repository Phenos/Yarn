yarn.service("doReveal", function (state, assert, predicates, things) {

    function doReveal(object) {
        var reveals = state.many("Object reveals *", {Object: object});

        angular.forEach(reveals, function (revealed) {
            state.negate(assert(revealed, "is", "Hidden"));
        });

        var hides = state.many("Object hides *", {Object: object});
        angular.forEach(hides, function (hidden) {
            // todo: Add source
            state.createAssertion(hidden, predicates("is"), things.get("Hidden"));
        });

    }

    return doReveal;
});