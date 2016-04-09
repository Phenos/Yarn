yarn.service("objectReferenceInspection",
    function objectReferenceInspection(InspectionArticle,
                                       things,
                                       state,
                                       assert) {
        return {
            inspect: inspect
        };

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        function inspect(token, yeld) {
            var thing;

            if (token && token.type === "camelcase") {
                var txt = token.value;
                if (txt) {

                    var scope = {};

                    if (token && token.value) {
                        thing = things.get(token.value);
                        var isStandard =
                            state.resolveValue(assert(thing.id, "is", "Standard"));

                        var hasHelpArticle =
                            state.resolveValue(assert(thing.id, "has", "HelpArticle"));
                        if (hasHelpArticle) {
                            var helpArticleTitle =
                                hasHelpArticle
                                    .replace("./", "")
                                    .replace(".html", "")
                                    .replace("/", " - ");
                            helpArticleTitle = toTitleCase(helpArticleTitle);
                            token.helpArticles.push({
                                title: helpArticleTitle,
                                url: hasHelpArticle
                            });
                        }

                        scope.title = "Is an object";
                        scope.type = "objectReference";
                        scope.isStandard = isStandard;
                    }

                    token.helpArticles.push({
                        title: "YarnScrip Language Basics",
                        url: "./yarnscript-language.html"
                    });

                    yeld(new InspectionArticle(
                        scope.title,
                        "objectReference", "object-reference",
                        scope))

                }
            }
        }

    });

yarn.directive('objectReference', function objectReference() {
    return {
        replace: true,
        templateUrl: "./html/inspections/objectReference.html",
        controller: function () {
        }
    };
});
