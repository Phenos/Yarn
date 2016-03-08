yarn.service("aboutToRoutine", function (state,
                                         things,
                                         predicates,
                                         commands) {

    function aboutToRoutine(intention) {
        if (intention === "take") {
            // todo: ... this is a hack to show the list of inventory in the take command
            commands.command("playerInventory");
        }
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

