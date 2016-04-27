(function () {

    yarn.directive('assertionGrid', assertionGridDirective);


    function assertionGridDirective(openFileFromAbsoluteURL) {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            template:'<div class=grid ui-grid=options ui-grid-auto-resize></div>',
            controller: AssertionGridController
        };

        function AssertionGridController($scope) {

            $scope.$watch("data", function () {
                $scope.options.data = $scope.data;
            });

            $scope.goToSource = function (source) {
                openFileFromAbsoluteURL(source.uri, source.line);
            };

            $scope.options = {
                rowHeight: 30,
                enableFiltering: true,
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
                        displayName: 'verb',
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
                        cellTemplate:
                            /* eslint max-len:0 */
                            '<div class="ngCellText" ng-class="col.colIndex()">' +
                            '<div class="ui-grid-cell-contents" ng-cell-text>' +
                            '<a href="#" ng-click="$event.preventDefault();grid.appScope.goToSource(COL_FIELD);">' +
                            '{{ COL_FIELD.file }}:{{ COL_FIELD.line }}</a></div></div>',
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
