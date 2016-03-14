(function () {

    yarn.directive('inspector', InspectorDirective);
    yarn.service('inspector', inspectorService);

    yarn.directive('inspectorArticle', function InspectorArticle($compile) {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                var scope = $scope.$new(false);
                angular.extend(scope, $scope.article.scope);
                var articleElement = $compile("<" + $scope.article.directive + "></" + $scope.article.directive + ">")(scope);
                $element.append(articleElement);
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
            controller: InspectorController
        };

        function InspectorController($scope, $element, inspector, $compile) {
            var self = this;

            this.token = null;

            inspector.register(this);

            this.update = function (articles) {
                //var elemArticles = $element.find("articles");
                //elemArticles.empty();
                self.articles = articles;
            };

        }

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
            this.clear();
            var self = this;
            angular.forEach(inspections, function (inspection) {
                inspection.inspect(token, onYeld);
            });

            function onYeld(article) {
                self.addArticle(article);
            }

            controller.update(self.articles)
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
