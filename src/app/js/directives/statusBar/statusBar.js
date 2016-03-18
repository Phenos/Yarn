yarn.directive('statusBar', function StatusBarDirective(storyLog) {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/statusBar.html',
        controller: StatusBarController
    };

    function StatusBarController($scope, statuses) {
        $scope.updated = "banana";
        $scope.statuses = statuses;
        $scope.allStatuses = statuses.getAll();

        $scope.$watch("statuses.updated",function() {
            $scope.allStatuses = statuses.getAll();
            $scope.updated = statuses.updated;
        });

        $scope.click = function (status) {
            if (status.description) {
                storyLog.log(status.description);
            }
        }
    }
});

