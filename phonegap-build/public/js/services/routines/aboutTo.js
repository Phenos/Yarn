yarn.service("aboutToRoutine", function (state,
                                         things,
                                         lookAroundRoutine,
                                         lookAtExitsRoutine,
                                         lookAtUsablesRoutine,
                                         inventoryRoutine,
                                         predicates) {

    function aboutToRoutine(_intention) {
        var intention = _intention || "";

        //console.log("intention.toLowerCase()", intention.toLowerCase());
        if (intention.toLowerCase() === "inventory") {

            inventoryRoutine();

        } else if (intention.toLowerCase() === "look") {

            lookAroundRoutine();

        } else if (intention.toLowerCase() === "move") {

            lookAtExitsRoutine();

        } else if (intention.toLowerCase() === "use") {

            lookAtUsablesRoutine();
        }

        var you = things.get("Player");
        var has = predicates("has");
        var intentionObj = things.get("intention");
        state.createAssertion(you, has, intentionObj, {
            value: intention
        });

        return true;
    }

    return aboutToRoutine;
});

