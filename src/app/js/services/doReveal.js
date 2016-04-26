yarn.service("doReveal", function (state, assert, predicates, things) {

    // todo: split the Hidden and Active status into discrinct function

    function doReveal(object) {
        console.log("++===>>> doReveal ");

        var reveals = state.many("Object reveals *", {Object: object});

        /*

        Mechanics for "is Hidden"

        */
        angular.forEach(reveals, function (revealed) {
            state.negate(assert(revealed, "is", "Hidden"));
        });

        var hides = state.many("Object hides *", {Object: object});
        angular.forEach(hides, function (hidden) {
            // todo: Add source
            state.createAssertion(hidden, predicates("is"), things.get("Hidden"));
        });

        /*

        Mechanics for "is Active"

        */

        var deactivates = state.many("Object deactivates *", {Object: object});
        angular.forEach(deactivates, function (deactivated) {
            state.negate(assert(deactivated, "is", "Active"));
        });

        console.log("++===>>> Testing activates >>>> ");
        var activates = state.many("Object activates *", {Object: object});
        angular.forEach(activates, function (activated) {
            // todo: Add source
            console.log("++===>>> Activates >>>> ", activated);
            state.createAssertion(activated, predicates("is"), things.get("Active"));
        });

        /*

        Mechanics for "is Disabled"

        */
        var disables = state.many("Object disables *", {Object: object});
        angular.forEach(disables, function (disabled) {
            state.createAssertion(disabled, predicates("is"), things.get("Disabled"));
        });

        var enables = state.many("Object enables *", {Object: object});
        angular.forEach(enables, function (enabled) {
            // todo: Add source
            state.negate(assert(enabled, "is", "Disabled"));
        });

    }

    return doReveal;
});