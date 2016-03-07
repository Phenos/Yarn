yarn.factory('evalCommand', function evalCommand(state,
                                                 yConsole,
                                                 consoleHelper) {


    function handler(args) {
        var subject = state.thing(args[0], true);
        var predicate = state.predicate(args[1], true);
        var object = state.thing(args[2], true);
        if (subject && predicate) {
            var assertions = state.getAssertions(subject, predicate, object);

            console.log("assertion:", assertions);
            angular.forEach(assertions, function (assertion) {
                yConsole.log(consoleHelper.assertion2log(assertion));
            });
        } else {
            console.log()
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

