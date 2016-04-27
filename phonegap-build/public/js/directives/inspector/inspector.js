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
                var articleElement =
                    $compile("<" + $scope.article.directive +
                        "></" + $scope.article.directive + ">")(scope);
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
            template:'<div class=inspector layout=column><div layout=column ng-show="inspector.articles.length > 0"><h2>{{ inspector.title }}</h2><div class=summary ng-if=inspector.summary>{{ inspector.summary }}</div><articles><article ng-repeat="article in inspector.articles" inspector-article ng-class=\'"type-" + article.type\'><md-fab-speed-dial md-direction=left md-open=article.menuIsOpen md-fab-top-right md-hover-full><md-fab-trigger><md-button class=md-fab><md-icon md-svg-src="/svg-icons/inspections/{{::article.type }}.svg" aria-label=menu></md-icon></md-button></md-fab-trigger><md-fab-actions><md-button aria-label="{{::action.label }}" class="md-fab md-raised md-mini" ng-click=action.callback(); ng-repeat="action in ::article.actions"><md-tooltip md-direction=bottom>{{::action.label}}</md-tooltip><md-icon md-svg-src="/svg-icons/{{::action.icon }}.svg" aria-label="{{::action.label }}"></md-icon></md-button></md-fab-actions></md-fab-speed-dial><h3>{{::article.title }}</h3><section></section></article></articles></div><div ng-if="!inspector.articles || inspector.articles.length === 0" layout-fill layout=column layout-align="center center"><div style="color: rgba(0,0,0,0.4)">To inspect something, move you text cursor over any<br>word in the editor, or select an item from the list of things.</div></div></div>',
            controller: function InspectorController(inspector, state, assert) {
                var self = this;

                this.token = null;
                this.summary = null;
                this.title = null;

                this.getTitle = function () {
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

                this.getSummary = function () {
                    var value = null;
                    if (this.token) {
                        var summary = state.resolveValue(
                            assert(this.token.value, "has", "DocSummary")
                        );
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
                    self.summary = this.getSummary();
                    self.title = this.getTitle();
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
            // Trim the token value to simplify matching
            if (token.value) {
                token.value = token.value.trim();
            }
            controller.token = token;
            var self = this;
            if (controller && angular.isObject(token)) {
                token.helpArticles = [];
                this.clear();
                angular.forEach(inspections, function (inspection) {
//                    console.log("token", token);
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
