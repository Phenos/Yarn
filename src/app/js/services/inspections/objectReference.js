yarn.service("objectReferenceInspection",
    function objectReferenceInspection(InspectionArticle) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {

            if (token && token.type === "camelcase") {
                var txt = token.value;
                if (txt) {

                    var scope = {};

                    if (token && token.value) {
                        scope.title = txt;
                        scope.type = "objectReference";
                        scope.assertionCount = 999;
                        scope.openAsSubject = openAsSubject;
                        scope.openAsObject = openAsObject;
                    }

                    token.helpArticles.push({
                        title: "YarnScrip Language Basics",
                        url: "./yarnscript-language.html"
                    });

                    yeld(new InspectionArticle(txt.trim(), "objectReference", "object-reference", scope))

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
