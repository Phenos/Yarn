yarn.factory('evalCommand', function evalCommand(state,
                                                 yConsole,
                                                 assert,
                                                 things,
                                                 predicates,
                                                 consoleHelper) {


    function handler(args) {
        var subject = things.get(args[0], true) || undefined;
        var predicate = predicates(args[1], true) || undefined;
        var object = things.get(args[2], true) || undefined;

        if (subject && predicate) {
            var assertions = state.assertions.find(assert(subject, predicate, object));

            console.log("assertion:", assertions);
            angular.forEach(assertions, function (assertion) {
                yConsole.log(consoleHelper.assertion2log(assertion));
            });
        }
    }


    return {
        name: "eval",
        autocompletePreview: "eval <strong>SubjectName</strong> <em>predicateName</em> [<strong>ObjectName</strong>]",
        autocompleteText: "eval ",
        shortDescription: "Evaluate an assertion",
        longDescription: "Evaluate an assertion : Ex.: eval SubjectByName predicateName ObjectByName",
        handler: handler
    };

});

