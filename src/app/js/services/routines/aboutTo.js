yarn.service("aboutToRoutine", function (state,
                                         commands) {

    function aboutToRoutine(aboutToId) {
        var isAboutTo = state.predicate("isAboutTo");
        var you = state.thing("You");
        if (aboutToId) {
            if (aboutToId === "take") {
                commands.command("playerInventory");
            }
            state.createAssertion(you, isAboutTo, aboutToId);
        } else {
            state.createAssertion(you, isAboutTo, null, {
                value: false
            });
        }
        return true;
    }

    return aboutToRoutine;

});

