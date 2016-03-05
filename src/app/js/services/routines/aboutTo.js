yarn.service("aboutToRoutine", function (state,
                                         commands) {

    function aboutToRoutine(intention) {
        if (intention === "take") {
            // todo: ... this is a hack to show the list of inventory in the take command
            commands.command("playerInventory");
        }
        var you = state.thing("you");
        var has = state.predicate("has");
        var intentionObj = state.thing("intention");
        state.createAssertion(you, has, intentionObj, {
            value: intention
        });
        return true;
    }

    return aboutToRoutine;

});

