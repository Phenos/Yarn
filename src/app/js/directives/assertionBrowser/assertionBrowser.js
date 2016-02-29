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


    function assertionBrowserGridDirective(state) {
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

            this.gridOptions = {
                enableFiltering: true,
                columnDefs: [
                    {
                        field: 'subject.text()',
                        displayName: 'subject'
                        //filter: {
                        //    condition: uiGridConstants.filter.ENDS_WITH,
                        //    placeholder: 'ends with'
                        //}
                    },
                    {field: 'predicate.label', displayName: 'predicate'},
                    {field: 'object', displayName: 'object'},
                    {field: 'layer', displayName: 'layer'},
                    {field: 'parent', displayName: 'parent'},
                    {field: '_value', displayName: 'value'}
                ],
                data: this.data
            };

        }

    }

    function assertionBrowserService(hotkeys,
                                     $mdDialog) {

        var service = {
            isOpen: false
        };

        var controller;

        service.register = function (_controller, scope) {
            controller = _controller;

            hotkeys.bindTo(scope)
                .add({
                    combo: 'mod+b',
                    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                    description: 'Open assertion browser',
                    callback: function () {
                        service.toggle();
                    }
                });
        };

        service.open = function () {
            service.isOpen = false;
            $mdDialog.show({
                controller: AssertionBrowserWindowController,
                templateUrl: './html/assertionBrowserWindow.html',
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            });

            function AssertionBrowserWindowController($scope, state) {
                $scope.data = state.assertions.all()
            }
        };

        service.close = function () {
            service.isOpen = false;
            $mdDialog.close();
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
