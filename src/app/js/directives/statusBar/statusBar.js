yarn.directive('statusBar', function StatusBarDirective() {
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

        $scope.$watch("statuses.updated",function(newValue,oldValue) {
            $scope.allStatuses = statuses.getAll();
            $scope.updated = statuses.updated;
        });

        $scope.click = function (status) {
            console.log("Clicked status: ", status)
        }
    }
});

