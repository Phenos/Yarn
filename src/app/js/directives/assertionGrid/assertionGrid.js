(function () {

    yarn.directive('assertionGrid', assertionGridDirective);


    function assertionGridDirective(editorFiles) {
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

            $scope.goToSource = function (source) {
                editorFiles.open(source.uri, true, source.line);
            };

            $scope.options = {
                //enableFiltering: true,
                enableRowReordering: true,
                enableGridMenu: true,
                onRegisterApi: function(gridApi){
                    $scope.gridApi = gridApi;
                },
                columnDefs: [
                    {
                        field: 'subject.text()',
                        displayName: 'subject',
                        width: "*"
                    },
                    {
                        field: 'predicate.label',
                        displayName: 'predicate',
                        width: 80
                    },
                    {
                        field: 'object.text()',
                        displayName: 'object',
                        width: "*"
                    },
                    {
                        field: '_value',
                        displayName: 'value',
                        cellTooltip: true
                    },
                    {
                        field: 'layer',
                        displayName: 'layer',
                        width: 60
                    },
                    {
                        field: 'parent.text()',
                        displayName: 'parent',
                        width: 80
                    },
                    {
                        field: 'weight()',
                        displayName: 'weight'
                    },
                    {
                        field: 'source',
                        cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><div class="ui-grid-cell-contents" ng-cell-text><a href="#" ng-click="grid.appScope.goToSource(COL_FIELD);$event.preventDefault();">{{ COL_FIELD.file }}:{{ COL_FIELD.line }}</a></div></div>',
                        displayName: 'source'
                    }
                ],
                data: $scope.data
            };

            $scope.state = {};

            $scope.saveState = function() {
                $scope.state = $scope.gridApi.saveState.save();
            };

            $scope.restoreState = function() {
                $scope.gridApi.saveState.restore( $scope, $scope.state );
            };
        }

    }

})();
