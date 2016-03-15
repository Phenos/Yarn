yarn.service("predicateReferenceInspection",
    function predicateReferenceInspection(InspectionArticle, predicates, syntaxes) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {

            if (token && token.type === "identifier") {
                var txt = token.value;
                if (txt) {

                    var scope = {};

                    if (token && token.value) {
                        scope.title = txt;
                        scope.type = "predicateReference";
                        scope.assertionCount = 999;
                        var predicate = predicates(txt, true);
                        console.log("predicate", predicate);
                        if (!predicate) {
                            scope.isCustomPredicate = true;
                        } else {
                            scope.syntaxesForPredicate = syntaxes.for(predicate);
                        }
                        scope.openAsPredicate = openAsPredicate;
                    }

                    yeld(new InspectionArticle(txt.trim(), "predicateReference", "predicate-reference", scope))
                }
            }

            function openAsPredicate() {
            }
        }

    });

yarn.directive('predicateReference', function predicateReference() {
    return {
        replace: true,
        templateUrl: "./html/inspections/predicateReference.html",
        controller: function ($scope) {
        }
    };
});
