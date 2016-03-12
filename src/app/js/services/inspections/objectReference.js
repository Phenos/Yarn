yarn.service("objectReferenceInspection",
    function objectReferenceInspection(InspectionArticle,
                                       URI,
                                       editorFiles,
                                       $window) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {
            console.log("token", token);
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

                    yeld(new InspectionArticle("Object Reference", "objectReference", "object-reference", scope))
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
