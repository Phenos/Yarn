yarn.service("aboutToRoutine", function (state) {

    function aboutToRoutine(aboutToId) {
        var isAboutTo = state.predicate("isAboutTo");
        var you = state.thing("You");
        if (aboutToId) {
            state.createAssertion(you, isAboutTo, state.thing(aboutToId));
        } else {
            state.createAssertion(you, isAboutTo, null, {
                value: false
            });
        }
        return true;
    }

    return aboutToRoutine;

});

