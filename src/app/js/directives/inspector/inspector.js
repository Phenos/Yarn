(function () {

    yarn.directive('inspector', InspectorDirective);
    yarn.service('inspector', inspectorService);


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

            this.clear = function () {
                var logElement = $element.find("logs");
                logElement.empty();

                this.onClear();
            };

            this.update = function (articles) {
                var elemArticles = $element.find("articles");

                self.articles = articles;
                elemArticles.empty();

                angular.forEach(articles, function (article) {
                    var scope = $scope.$new(false);
                    angular.extend(scope, article.scope);
                    var element = $compile("<" + article.directive + "></" + article.directive + ">")(scope);
                    elemArticles.append(element);
                });
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
