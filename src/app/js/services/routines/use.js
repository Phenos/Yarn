yarn.service("useRoutine", function (state) {

    function useRoutine(aboutToId) {
        var isAboutTo = state.predicate("isAboutTo");
        if (aboutToId) {
            state.thing("You").setAssertion(isAboutTo, state.thing(aboutToId));
            //console.log("ABOUT TO >> ", aboutTo);
        } else {
            state.negate(
                state.thing("You").getAssertion(isAboutTo)
            );
            //console.log("CLEARED ABOUT TO !!! ");
        }
        return true;
    }

    return useRoutine;

});

