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

                    token.helpArticles.push({
                        title: "YarnScrip Language Basics",
                        url: "./yarnscript-language.html"
                    });

                    yeld(new InspectionArticle(scope.title, "objectReference", "object-reference", scope))

                }
            }

            function openAsSubject() {
            }

            function openAsObject() {
            }
        }

    });

yarn.directive('objectReference', function objectReference() {
    return {
        replace: true,
        templateUrl: "./html/inspections/objectReference.html",
        controller: function ($scope) {
        }
    };
});
