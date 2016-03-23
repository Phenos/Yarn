yarn.service("occurencesInspection",
    function occurencesInspection(InspectionArticle,
                                  things,
                                  predicates,
                                  state) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {
            var thing;
            var predicate;
            var assertions = [];
            var scope = {
                title: "Occurences"
            };


            if (token) {
                scope.assertions = assertions;

                if (token.type === "camelcase") {
                    thing = things.get(token.value, true);
                    if (thing) {
                        var allAssertions = state.assertions.all();
                        angular.forEach(allAssertions, function (assertion) {
                            var keep = false;
                            if (assertion.subject === thing) keep = true;
                            if (assertion.object === thing) keep = true;
                            if (keep) assertions.push(assertion);
                        });
                    }
                } else if (token.type === "identifier") {
                    predicate = predicates(token.value, true);
                    if (predicate) {
                        var allAssertions = state.assertions.all();
                        angular.forEach(allAssertions, function (assertion) {
                            var keep = false;
                            if (assertion.predicate === predicate) keep = true;
                            if (keep) assertions.push(assertion);
                        });
                    }
                }

                if (assertions.length > 0) {
                    yeld(new InspectionArticle(scope.title, "occurences", "occurences", scope))
                }
            }

        }

    });

yarn.directive('occurences', function occurences() {
    return {
        replace: true,
        templateUrl: "./html/inspections/occurences.html",
        controller: function ($scope, editorFiles) {
            $scope.goToSource = function (source) {
                if (source) {
                    editorFiles.open(source.uri, true, source.line);
                }
            };

        }
    };
});
