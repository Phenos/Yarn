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
            templateUrl: './html/help.html',
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

                var self = this;
                var resolvedURI = URI(uri).absoluteTo("./help/").toString();


                //console.log("resolvedURI", resolvedURI);

                var config = {
                    method: 'GET',
                    url: resolvedURI + "?random=" + Math.random(),
                    cache: false
                };

                function then(response) {
                    self.setContent(response.data);
                    //console.log("response", response);

                    return {
                        source: response.data,
                        url: resolvedURI
                    };
                }

                return $http(config).then(then);
            };

            $element.on("click", function (e) {
                var target = e.target;
                //console.log("-", e);
                if (target.parentElement.tagName === "A") target = target.parentElement;
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
                helpContent.empty().append(elem);
                $scope.$broadcast("refreshScrollbars");
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
            //console.log("focus!");
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
