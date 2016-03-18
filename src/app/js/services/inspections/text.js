yarn.service("textInspection", function textInspection(InspectionArticle) {
    return {
        inspect: inspect
    };

    function inspect(token, yeld) {
        if (token && token.type === "string") {
            var txt = token.value.substring(1, token.value.length - 1);

            var scope = {};

            if (token.value) {
                scope.title = "Text";
                scope.type = "text";

                var regex = /\s+/gi;
                scope.characterCount = txt.length;
                scope.wordCount = txt.trim().replace(regex, ' ').split(' ').length;
                scope.assertionsCount = "[n/a]";
            }

            token.helpArticles.push({
                title: "Text Templating",
                url: "./language-templating.html"
            });

            yeld(new InspectionArticle("Text", "text", "text-inspection", scope))
        }

    }

});

yarn.directive('textInspection', function textInspection() {
    return {
        replace: true,
        templateUrl: "./html/inspections/text.html",
        controller: function ($scope) {
        }
    };
});
