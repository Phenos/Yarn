yarn.service("occurencesInspection",
    function occurencesInspection(InspectionArticle,
                                  things,
                                  state) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {
            var thing;
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

                }

                yeld(new InspectionArticle(scope.title, "occurences", "occurences", scope))
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
