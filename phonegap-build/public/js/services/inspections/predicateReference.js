yarn.service("predicateReferenceInspection",
    function predicateReferenceInspection(InspectionArticle,
                                          predicates,
                                          state,
                                          syntaxes) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {

            if (token && token.type === "identifier") {
                var txt = token.value;
                if (txt) {

                    var scope = {};

                    if (token && token.value) {
                        scope.title = "Verb";
                        scope.type = "predicateReference";

                        var predicate = predicates(txt, true);

                        if (!predicate) {
                            scope.isCustomPredicate = true;
                        } else {
                            scope.syntaxesForPredicate = syntaxes.for(predicate);
                        }
                        scope.openAsPredicate = openAsPredicate;
                    }

                    token.helpArticles.push({
                        title: "YarnScrip Language Basics",
                        url: "./yarnscript-language.html"
                    });

                    yeld(new InspectionArticle(scope.title, "predicateReference", "predicate-reference", scope))
                }
            }

            function openAsPredicate() {
            }
        }

    });

yarn.directive('predicateReference', function predicateReference() {
    return {
        replace: true,
        template:'<div><p>This is a <strong ng-if=isCustomPredicate>custom verb</strong> <span ng-if=!isCustomPredicate>standard verb</span>.</p><p ng-if=syntaxesForPredicate><span ng-if="syntaxesForPredicate.positive.length === 0">Not synonyms found.</span> <strong ng-if="syntaxesForPredicate.positive.length > 0">Found {{ syntaxesForPredicate.positive.length }} synonyms:&nbsp;&nbsp;</strong> <span ng-repeat="syntax in syntaxesForPredicate.positive"><em>{{ syntax.text}}</em><span ng-if=!$last>,&nbsp;&nbsp;</span><span ng-if=$last>.</span></span></p><p ng-if=syntaxesForPredicate><span ng-if="syntaxesForPredicate.negative.length === 0">Not antonyms found.</span></p><h4 ng-if="syntaxesForPredicate.negative.length > 0">Found {{ syntaxesForPredicate.negative.length }} antonyms:<br></h4><p><span ng-repeat="syntax in syntaxesForPredicate.negative"><em>{{ syntax.text }}</em><span ng-if=!last>,&nbsp;&nbsp;</span><span ng-if=$last>.</span></span></p></div>',
        controller: function ($scope) {
        }
    };
});
