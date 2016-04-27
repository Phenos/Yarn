yarn.directive('statusBar', function StatusBarDirective(storyLog,
                                                        state) {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<md-toolbar class=statusBar ng-if="allStatuses.length > 0 && visible"><div class=md-toolbar-tools><div flex=grow layout=row layout-align="center center"><md-button ng-repeat="status in allStatuses" ng-click=click(status)><md-icon ng-if=status.standardIcon md-svg-icon="./svg-icons/status/{{ status.standardIcon }}.svg"></md-icon><md-icon ng-if="status.SVGIcon && !status.standardIcon" md-svg-icon="{{ status.SVGIcon }}"></md-icon><span ng-if="!status.standardIcon && !status.SVGIcon">{{ status.name }} :&nbsp;</span> <span>{{ status.formattedValue() }}</span><md-tooltip md-direction=top>{{ status.name }}</md-tooltip></md-button></div></div></md-toolbar>',
        controller: StatusBarController
    };

    function StatusBarController($scope, statuses) {
        $scope.updated = "banana";
        $scope.statuses = statuses;
        $scope.allStatuses = statuses.getAll();
        $scope.visible = false;

        $scope.$watch("statuses.updated", function () {
            $scope.allStatuses = statuses.getAll();
            $scope.updated = statuses.updated;
            $scope.visible = state.step() > 0;
        });

        $scope.click = function (status) {
            if (status.description) {
                storyLog.log(status.description);
            }
        }
    }
});

