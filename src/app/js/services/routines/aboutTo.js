yarn.service("aboutToRoutine", function (state,
                                         things,
                                         inventoryRoutine,
                                         predicates) {

    function aboutToRoutine(intention) {

        //console.log("intention.toLowerCase()", intention.toLowerCase());
        if (intention.toLowerCase() === "inventory") {

            inventoryRoutine();

        } else {

            var you = things("you");
            var has = predicates("has");
            var intentionObj = things("intention");
            state.createAssertion(you, has, intentionObj, {
                value: intention
            });

        }

        return true;
    }

    return aboutToRoutine;
});

