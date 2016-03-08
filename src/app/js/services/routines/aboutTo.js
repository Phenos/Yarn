yarn.service("aboutToRoutine", function (state,
                                         things,
                                         predicates) {

    function aboutToRoutine(intention) {
        var you = things("you");
        var has = predicates("has");
        var intentionObj = things("intention");
        state.createAssertion(you, has, intentionObj, {
            value: intention
        });
        return true;
    }

    return aboutToRoutine;
});

