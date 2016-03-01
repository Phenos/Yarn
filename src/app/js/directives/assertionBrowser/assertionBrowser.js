(function () {

    yarn.directive('assertionBrowser', assertionBrowserDirective);
    yarn.directive('assertionBrowserGrid', assertionBrowserGridDirective);
    yarn.service('assertionBrowser', assertionBrowserService);

    function assertionBrowserDirective() {
        return {
            restrict: 'E',
            bindToController: {},
            scope: {},
            controllerAs: 'assertionBrowserModal',
            controller: function (assertionBrowser, $scope) {
                assertionBrowser.register(this, $scope);
            }
        };


    }


    function assertionBrowserGridDirective() {
        return {
            restrict: 'E',
            bindToController: {
                data: "="
            },
            scope: {},
            controllerAs: 'assertionBrowser',
            templateUrl: './html/assertionBrowserGrid.html',
            controller: AssertionBrowserGridController
        };

        function AssertionBrowserGridController() {

            this.options = {
                enableFiltering: true,
                columnDefs: [
                    {
                        field: 'subject.text()',
                        displayName: 'subject'
                    },
                    {
                        field: 'predicate.label',
                        displayName: 'predicate'},
                    {
                        field: 'object',
                        displayName: 'object'},
                    {
                        field: 'layer',
                        displayName: 'layer'},
                    {
                        field: 'parent',
                        displayName: 'parent'},
                    {
                        field: '_value',
                        displayName: 'value'},
                    {
                        field: 'weight()',
                        displayName: 'weight'
                    }
                ],
                data: this.data
            };

        }

    }

    function assertionBrowserService($rootScope,
                                     hotkeys,
                                     $mdDialog) {

        var service = {
            isOpen: true
        };

        var controller;

        service.register = function (_controller) {
            controller = _controller;

            hotkeys.bindTo($rootScope).add({
                    combo: 'mod+b',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Open assertion browser',
                    callback: function () {
                        service.toggle();
                    }
                });
        };

        service.open = function () {
            service.isOpen = true;
            $mdDialog.show({
                templateUrl: './html/assertionBrowserWindow.html',
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose: true,
                controller: function ($scope, state, assertionBrowser) {
                    $scope.data = state.assertions.all();
                    $scope.close = function () {
                        assertionBrowser.close()
                    };
                }
            });


        };

        service.close = function () {
            $mdDialog.cancel();
            service.isOpen = false;
        };

        service.toggle = function () {
            if (service.isOpen) {
                service.close();
            } else {
                service.open();
            }
        };

        return service;
    }

})();
