(function () {

    yarn.directive('inspector', InspectorDirective);
    yarn.service('inspector', inspectorService);
    yarn.service('thingInspector', inspectorService);

    yarn.directive('inspectorArticle', function InspectorArticle($compile) {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                var scope = $scope.$new(false);
                angular.extend(scope, $scope.article.scope);
                var articleElement = $compile("<" + $scope.article.directive + "></" + $scope.article.directive + ">")(scope);
                $element.find("section").append(articleElement);
            }
        };
    });


    function InspectorDirective() {
        return {
            restrict: 'E',
            bindToController: {
            },
            scope: {},
            replace: true,
            controllerAs: 'inspector',
            templateUrl: './html/inspector.html',
            controller: function InspectorController(inspector, state, assert) {
                var self = this;

                this.token = null;

                this.title = function () {
                    var value = "Nothing to inspect!";
                    if (this.token) {
                        var title = this.token.value;
                        if (title.length > 40) {
                            title = title.substring(0, 35) + "…";
                        }
                        value = title;
                    }
                    return value;
                };

                this.summary = function () {
                    var value = null;
                    if (this.token) {
                        var summary = state.resolveValue(assert(this.token.value, "has", "DocSummary"));
                        if (summary) {
                            if (summary.length > 140) {
                                summary = summary.substring(0, 135) + "…";
                            }
                        }
                        value = summary;
                    }
                    return value;
                };

                this.update = function (articles) {
                    self.articles = articles;
                };

                inspector.register(this);

            }
        };



    }

    function inspectorService(inspections) {
        var service = {};
        var controller;

        service.articles = [];

        service.register = function (_controller) {
            controller = _controller;
        };

        service.clear = function () {
            controller.clear()
        };

        service.inspect = function (token) {
            controller.token = token;
            console.log("inspect()", token, controller);
            var self = this;
            if (controller && angular.isObject(token)) {
                token.helpArticles = [];
                this.clear();
                angular.forEach(inspections, function (inspection) {
                    //console.log("token", token);
                    inspection.inspect(token, onYeld);
                });
                function onYeld(article) {
                    self.addArticle(article);
                }

                controller.update(self.articles)
            }

        };

        service.addArticle = function (article) {
            this.articles.push(article)
        };

        service.clear = function () {
            this.articles = [];
        };

        return service;
    }

})();
