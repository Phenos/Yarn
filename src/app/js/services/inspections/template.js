yarn.service("templateInspection", function templateInspection(InspectionArticle, state) {
    return {
        inspect: inspect
    };

    function inspect(token, yeld) {
        if (token) {
            if (token.type === "string") {
                if (token.value.indexOf("{%") > -1 ||
                    token.value.indexOf("[") > -1 ||
                    token.value.indexOf("{{") > -1) {
                    var txt = token.value.substring(1, token.value.length - 1);

                    var scope = {};

                    if (token.value) {
                        scope.title = "Template";
                        scope.type = "template";

                        var output = state.render(txt);

                        if (angular.isObject(output) && output.constructor.name === "Error") {
//                            console.log("output: ", [output]);
//                            scope.value = output;
                            scope.type = 'error';
                            scope.error = output.message;
                            scope.errorStact = output.stack.replace("\n", "<br/>");
//                            console.log("stack", [output.stack]);
                        } else {
                            scope.value = output;
                            scope.type = typeof(output);
                        }
                    }

                    token.helpArticles.push({
                        title: "Text Templating",
                        url: "./language-templating.html"
                    });

                    yeld(new InspectionArticle("Template",
                        "template",
                        "template-inspection",
                        scope))
                }
            }
        }
    }

});

yarn.directive('templateInspection', function templateInspection() {
    return {
        replace: true,
        templateUrl: "./html/inspections/template.html",
        controller: function () {
        }
    };
});
