yarn.service("aboutToRoutine", function (state) {

    function aboutToRoutine(aboutToId) {
        var isAboutTo = state.predicate("isAboutTo");
        if (aboutToId) {
            state.thing("You").setAssertion(isAboutTo, state.thing(aboutToId));
            state.createAssertion()
            //console.log("ABOUT TO >> ", aboutTo);
        } else {
            state.negate(
                state.thing("You").getAssertion(isAboutTo)
            );
            //console.log("CLEARED ABOUT TO !!! ");
        }
        return true;
    }

    return aboutToRoutine;

});

