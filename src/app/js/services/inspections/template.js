yarn.service("templateInspection", function templateInspection(InspectionArticle, state) {
    return {
        inspect: inspect
    };

    function inspect(token, yeld) {
        if (token && token.type === "string" ||
            token.indexOf("{%") > -1 ||
            token.indexOf("{{") > -1) {
            var txt = token.value.substring(1, token.value.length - 1);

            var scope = {};

            if (token.value) {
                scope.title = "Template";
                scope.type = "template";

                var output = state.render(txt);
                scope.value = output;
                scope.type = typeof(output);
            }

            token.helpArticles.push({
                title: "Text Templating",
                url: "./language-templating.html"
            });

            yeld(new InspectionArticle("Template", "template", "template-inspection", scope))
        }

    }

});

yarn.directive('templateInspection', function templateInspection() {
    return {
        replace: true,
        templateUrl: "./html/inspections/template.html",
        controller: function ($scope) {
        }
    };
});
