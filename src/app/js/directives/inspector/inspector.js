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
                service: "="
            },
            scope: {},
            replace: true,
            controllerAs: 'inspector',
            templateUrl: './html/inspector.html',
            controller: function InspectorController(inspector) {
                var self = this;

                this.token = null;

                if (this.service) {
                    this.service.register(this);
                } else {
                    inspector.register(this);
                }

                this.update = function (articles) {
                    self.articles = articles;
                };

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
