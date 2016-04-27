(function () {

    yarn.directive('help', HelpDirective);
    yarn.service('help', helpService);


    function HelpDirective(help,
                           $localStorage) {
        return {
            restrict: 'E',
            bindToController: {
                onEscapeFocus: '&',
                onFocus: '&'
            },
            scope: {},
            replace: true,
            controllerAs: 'help',
            template:'<div class=help flex=grow layout=column><help-container flex=grow layout=column><help-content flex=grow layout=column md-whiteframe=5><link-bar flex=none layout=row layout-align="start start"><md-button ng-href=./index.html aria-label="Help home"><md-icon md-svg-icon=./svg-icons/home.svg></md-icon><md-tooltip>Help home</md-tooltip></md-button><md-button ng-disabled=!help.previousArticle ng-href="{{ help.previousArticle }}" aria-label="Previous article"><md-icon md-svg-icon=./svg-icons/pull-left.svg></md-icon><md-tooltip>Previous Article</md-tooltip></md-button><md-button ng-disabled=!help.parentArticle ng-href="{{ help.parentArticle }}" aria-label="Parent article"><md-icon md-svg-icon=./svg-icons/pull-up.svg></md-icon><md-tooltip>Parent article</md-tooltip></md-button><md-button ng-disabled=!help.nextArticle ng-href="{{ help.nextArticle }}" aria-label=Next><md-icon md-svg-icon=./svg-icons/pull-right.svg></md-icon><md-tooltip>Next article</md-tooltip></md-button></link-bar><md-content flex=100 layout=column><help-article md-whiteframe=5></help-article><div layout=row class=footer-navigation><md-button ng-if=help.previousArticle ng-href="{{ help.previousArticle }}" aria-label="Previous article"><md-icon md-svg-icon=./svg-icons/pull-left.svg></md-icon>Previous</md-button><div flex=auto></div><md-button ng-if=help.parentArticle ng-href="{{ help.parentArticle }}" aria-label="Parent article"><md-icon md-svg-icon=./svg-icons/pull-up.svg></md-icon><md-tooltip>Parent article</md-tooltip></md-button><div flex=auto></div><md-button ng-if=help.nextArticle ng-href="{{ help.nextArticle }}" aria-label=Next>Next<md-icon md-svg-icon=./svg-icons/pull-right.svg></md-icon></md-button></div></md-content></help-content></help-container></div>',
            controller: ConsoleController
        };

        function ConsoleController($element,
                                   $http,
                                   $compile,
                                   $scope,
                                   URI,
                                   root) {
            var self = this;
            help.register(this);

            this.focus = function () {
                root.showHelp();
            };

            this.lastHelpFileLoaded = function (uri) {
                if (!angular.isUndefined(uri)) {
                    $localStorage.lastHelpFileLoaded = uri
                }
                return $localStorage.lastHelpFileLoaded || "";
            };

            this.load = function (uri) {
                this.lastHelpFileLoaded(uri);
                var resolvedURI = URI(uri).absoluteTo("./help/").toString();

//                console.log("resolvedURI", resolvedURI);

                var config = {
                    method: 'GET',
                    url: resolvedURI + "?random=" + Math.random(),
                    cache: false
                };

                function then(response) {
                    self.setContent(response.data);
//                    console.log("response", response);

                    return {
                        source: response.data,
                        url: resolvedURI
                    };
                }

                return $http(config).then(then);
            };

            $element.on("click", function (e) {
                var target = e.target;
//                console.log("-", e);
                if (target.parentElement.tagName === "A") {
                    target = target.parentElement;
                }
                if (target.tagName === "A") {
                    e.preventDefault();
                    var $target = angular.element(target);
                    var href = $target.attr("href");
                    if (href) {
                        if (
                            href.substring(0, 7) !== "http://" &&
                            href.substring(0, 8) !== "https://"
                        ) {
                            self.load(href);
                        } else {
                            window.open(href, '_blank');

                        }
                    }

                }
            });

            this.setContent = function (content) {
                var helpContent = $element.find("help-article");
                var elem = $compile(content)($scope);
                this.nextArticle = elem.attr("next");
                this.parentArticle = elem.attr("parent");
                this.previousArticle = elem.attr("previous");

                $element.find("md-content")[0].scrollTop = 0;
                helpContent.empty().append(elem);
            };

            help.register(this);

            this.load(this.lastHelpFileLoaded() || "./index.html");
        }

    }

    function helpService() {
        var service = {};
        var controller;


        service.register = function (_controller) {
            controller = _controller;
        };

        service.focus = function () {
//            console.log("focus!");
            controller.focus();
            return this;
        };

        service.clear = function () {
            controller.clear();
            return this;
        };

        service.load = function (url) {
            controller.load(url);
            return this;
        };

        return service;
    }

})();
