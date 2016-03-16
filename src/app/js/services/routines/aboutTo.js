yarn.service("aboutToRoutine", function (state,
                                         things,
                                         inventoryRoutine,
                                         predicates) {

    function aboutToRoutine(intention) {
        var you = things("you");
        var has = predicates("has");
        var intentionObj = things("intention");
        state.createAssertion(you, has, intentionObj, {
            value: intention
        });

        console.log("intention.toLowerCase()", intention.toLowerCase());
        if (intention.toLowerCase() === "inventory") {
            inventoryRoutine();
        }

        return true;
    }

    return aboutToRoutine;
});

