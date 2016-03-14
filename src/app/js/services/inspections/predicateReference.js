yarn.service("predicateReferenceInspection",
    function predicateReferenceInspection(InspectionArticle) {
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
                        scope.openAsPredicate = openAsPredicate;
                    }

                    yeld(new InspectionArticle("Predicate Reference", "predicateReference", "predicate-reference", scope))
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
