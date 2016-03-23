yarn.service("occurencesInspection",
    function occurencesInspection(InspectionArticle,
                                       things,
                                       state) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {
            var thing;

            if (token && token.type === "camelcase") {
                var txt = token.value;
                if (txt) {

                    var scope = {};

                    if (token && token.value) {
                        thing = things.get(token.value);
                        scope.title = "This is an object";
                        scope.type = "objectReference";
                        scope.usageCount = {
                            total: 0,
                            asObject: 0,
                            asSubject: 0
                        };
                        scope.openAsSubject = openAsSubject;
                        scope.openAsObject = openAsObject;
                    }

                    // Count usage

                    var allAssertions = state.assertions.all();
                    angular.forEach(allAssertions, function (assertion) {
                        if (assertion.subject === thing) scope.usageCount.asSubject++;
                        if (assertion.object === thing) scope.usageCount.asObject++;
                        if (assertion.object === thing || assertion.subject === thing) scope.usageCount.total++;
                    });

                    yeld(new InspectionArticle(scope.title, "occurences", "occurences", scope))

                }
            }

            function openAsSubject() {
            }

            function openAsObject() {
            }
        }

    });

yarn.directive('occurences', function occurences() {
    return {
        replace: true,
        templateUrl: "./html/inspections/occurences.html",
        controller: function ($scope) {
        }
    };
});
