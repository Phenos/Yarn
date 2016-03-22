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
                        scope.title = "This is a predicate";
                        scope.type = "predicateReference";
                        scope.usageCount = {
                            total: 0
                        };
                        var predicate = predicates(txt, true);
                        //console.log("predicate", predicate);

                        var allAssertions = state.assertions.all();
                        angular.forEach(allAssertions, function (assertion) {
                            if (assertion.predicate === predicate) scope.usageCount.total++;
                        });



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
