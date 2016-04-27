yarn.service("commentInspection", function commentInspection(InspectionArticle) {
    return {
        inspect: inspect
    };

    function inspect(token, yeld) {
        if (token && token.type === "comment") {
            var txt = token.value.substring(1, token.value.length - 1);

            var scope = {};

            if (token.value) {
                scope.title = "Coment";
                scope.type = "comment";

                var regex = /\s+/gi;
                scope.characterCount = txt.length;
                scope.wordCount = txt.trim().replace(regex, ' ').split(' ').length;
            }

            token.helpArticles.push({
                title: "Line comments & block comments",
                url: "./language-comments.html"
            });

            yeld(new InspectionArticle("Comment", "comment", "comment-inspection", scope))
        }

    }

});

yarn.directive('commentInspection', function commentInspection() {
    return {
        replace: true,
        template:'<div><ul><li>{{ characterCount }} Characters</li><li>{{ wordCount}} Words</li></ul></div>',
        controller: function ($scope) {
        }
    };
});
