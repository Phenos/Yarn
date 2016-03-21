(function () {

    yarn.directive('assertionGrid', assertionGridDirective);


    function assertionGridDirective() {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            templateUrl: './html/assertionGrid.html',
            controller: AssertionGridController
        };

        function AssertionGridController($scope) {

            $scope.$watch("data", function () {
                $scope.options.data = $scope.data;
            });

            $scope.options = {
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
                        field: 'object.text()',
                        displayName: 'object'},
                    {
                        field: '_value',
                        displayName: 'value'},
                    {
                        field: 'layer',
                        displayName: 'layer'},
                    {
                        field: 'parent.text()',
                        displayName: 'parent'},
                    {
                        field: 'weight()',
                        displayName: 'weight'
                    }
                ],
                data: $scope.data
            };

        }

    }

})();
