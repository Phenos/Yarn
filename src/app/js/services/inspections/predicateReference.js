yarn.service("predicateReferenceInspection",
    function predicateReferenceInspection(InspectionArticle,
                                          predicates,
                                          state,
                                          syntaxes) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {

            if (token && token.type === "identifier") {
                var txt = token.value;
                if (txt) {

                    var scope = {};

                    if (token && token.value) {
                        scope.title = "Is a predicate";
                        scope.type = "predicateReference";

                        var predicate = predicates(txt, true);

                        if (!predicate) {
                            scope.isCustomPredicate = true;
                        } else {
                            scope.syntaxesForPredicate = syntaxes.for(predicate);
                        }
                        scope.openAsPredicate = openAsPredicate;
                    }

                    token.helpArticles.push({
                        title: "YarnScrip Language Basics",
                        url: "./yarnscript-language.html"
                    });

                    yeld(new InspectionArticle(scope.title, "predicateReference", "predicate-reference", scope))
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
