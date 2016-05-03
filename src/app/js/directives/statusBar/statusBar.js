yarn.directive('statusBar', function StatusBarDirective(transcript,
                                                        state) {
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
        $scope.visible = false;

        $scope.$watch("statuses.updated", function () {
            $scope.allStatuses = statuses.getAll();
            $scope.updated = statuses.updated;
            $scope.visible = state.step() > 0;
        });

        $scope.click = function (status) {
            if (status.description) {
                transcript.log(status.description);
            }
        }
    }
});

