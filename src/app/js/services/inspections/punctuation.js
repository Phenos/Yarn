yarn.service("punctuationInspection",
    function punctuationInspection(InspectionArticle) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {
            var scope = {
                title: "Punctuation"
            };

            if (token && token.type === "punctuation.operator") {
                token.helpArticles.push({
                    title: "Punctuation",
                    url: "./yarnscript-punctuation.html"
                });
                yeld(new InspectionArticle(scope.title, "punctuation", "punctuation", scope))
            }
        }

    });

yarn.directive('punctuation', function occurences() {
    return {
        replace: true,
        templateUrl: "./html/inspections/punctuation.html",
        controller: function ($scope, editorFiles) {
        }
    };
});
