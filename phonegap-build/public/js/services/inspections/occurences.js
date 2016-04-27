yarn.service("occurencesInspection",
    function occurencesInspection(InspectionArticle,
                                  things,
                                  predicates,
                                  state) {
        return {
            inspect: inspect
        };

        function inspect(token, yeld) {
            var thing;
            var predicate;
            var assertions = [];
            var allAssertions;
            var scope = {
                title: "Occurences"
            };


            if (token) {
                scope.assertions = assertions;

                scope.usageCount = {
                    total: 0,
                    asObject: 0,
                    asSubject: 0
                };

                if (token.type === "camelcase") {
                    thing = things.get(token.value, true);
                    if (thing) {
                        allAssertions = state.assertions.all();
                        angular.forEach(allAssertions, function (assertion) {
                            var keep = false;
                            if (assertion.subject === thing) {
                                scope.usageCount.asSubject++;
                                keep = true;
                            }
                            if (assertion.object === thing) {
                                keep = true;
                                scope.usageCount.asObject++;
                            }
                            if (assertion.object === thing || assertion.subject === thing) {
                                scope.usageCount.total++;
                            }

                            if (keep) assertions.push(assertion);
                        });
                    }
                } else if (token.type === "identifier") {
                    predicate = predicates(token.value, true);
                    if (predicate) {
                        allAssertions = state.assertions.all();
                        angular.forEach(allAssertions, function (assertion) {
                            var keep = false;
                            if (assertion.predicate === predicate) {
                                scope.usageCount.total++;
                                keep = true;
                            }
                            if (keep) assertions.push(assertion);
                        });
                    }
                }

                if (assertions.length > 0) {
                    yeld(new InspectionArticle(scope.title, "occurences", "occurences", scope))
                }
            }

        }

    });

yarn.directive('occurences', function occurences() {
    return {
        replace: true,
        template:'<div class=occurences-inspection><div class=occurence-summary>This item is used in {{ usageCount.total }} assertions in your story.<br><div ng-if="usageCount.asSubject || usageCount.asObject">It occurs {{ usageCount.asSubject }} times as subject and {{ usageCount.asObject }} times as the object</div></div><md-divider></md-divider><md-list><md-list-item ng-repeat="assertion in assertions" ng-click=goToSource(assertion.source);><div><span class=assertion><span class=subject>{{ assertion.subject._text }}</span> <span class=predicate>{{ assertion.predicate._text }}</span> <span class=object>{{ assertion.object._text }}</span></span> <span ng-if=assertion.source class=source>[<span class=url>{{ assertion.source.file }} <span class=line>:{{ assertion.source.line }}</span><md-tooltip md-direction=left>{{ assertion.source.uri }}</md-tooltip></span>]</span> <span ng-if=!assertion.source class=source>[set during play]</span></div></md-list-item></md-list></div>',
        controller: function ($scope, openFileFromAbsoluteURL) {
            $scope.goToSource = function (source) {
                openFileFromAbsoluteURL(source.uri, source.line);
            };

        }
    };
});
