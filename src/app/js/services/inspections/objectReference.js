yarn.service("objectReferenceInspection",
    function objectReferenceInspection(InspectionArticle,
                                       things,
                                       state,
                                       assert) {
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
                        var isStandard = state.resolveValue(assert(thing.id, "is", "Standard"));

                        scope.title = "Is an object";
                        scope.type = "objectReference";
                        scope.isStandard = isStandard;
                    }

                    token.helpArticles.push({
                        title: "YarnScrip Language Basics",
                        url: "./yarnscript-language.html"
                    });

                    yeld(new InspectionArticle(scope.title, "objectReference", "object-reference", scope))

                }
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
