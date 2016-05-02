yarn.service("predicates", function (syntaxes,
                                     Predicate) {

    var allPredicates = {};

    function predicates(_id, dontAutoCreate) {
        var predicate;
        var syntax;
        if (typeof(_id) === "string") {
            var id = _id.trim().toLowerCase();

            // Resolve the predicate from the syntax
            syntax = syntaxes.get(id);
            if (!syntax) {
                if (dontAutoCreate) {
                    predicate = null;
                } else {
                    predicate = new Predicate(id);
//                    console.log("Created new predicate", predicate);
                    allPredicates[id] = predicate;
                    // By default, create a positivie syntax for the ad hoc predicate
                    syntaxes.set(id, predicate);
                }
            } else {
                predicate = syntax.predicate;
            }
        } else {
            console.error("You must provide an id to find a predicate");
        }
        return predicate;
    }


    return predicates;
});