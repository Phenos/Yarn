yarn.service("urlInspection", function isURLInspection(InspectionArticle) {
    return {
        inspect: inspect
    };

    function inspect(token, yeld) {

        if (token.type === "string") {
            var scope = {};

            if (token && token.value) {
                scope.url = token.value.substring(1, token.value.length - 2);
            }

            yeld(new InspectionArticle("File Reference", "fileReference", "url-inspection", scope))
        }
    }

});

yarn.directive('urlInspection', function URLInspection() {
    return {
        templateUrl: "./html/inspections/isURI.html",
        controller: function($scope) {
        }
    };
});
