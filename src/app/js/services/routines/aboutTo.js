yarn.service("aboutToRoutine", function (state,
                                         things,
                                         lookAroundRoutine,
                                         inventoryRoutine,
                                         predicates) {

    function aboutToRoutine(_intention) {
        var intention = _intention || "";

        //console.log("intention.toLowerCase()", intention.toLowerCase());
        if (intention.toLowerCase() === "inventory") {

            inventoryRoutine();

        } else if (intention.toLowerCase() === "look") {

            lookAroundRoutine();
        }

        var you = things.get("you");
        var has = predicates("has");
        var intentionObj = things.get("intention");
        state.createAssertion(you, has, intentionObj, {
            value: intention
        });

        return true;
    }

    return aboutToRoutine;
});

