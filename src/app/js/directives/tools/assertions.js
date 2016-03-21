yarn.directive('assertionsTool', function CommandsTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/assertions.html',
        controller: function Controller($scope, state) {
            $scope.allAssertions = [];

            postal.subscribe({
                channel: "runtime",
                topic: "afterRun",
                callback: function () {
                    $scope.update();
                }
            });

            $scope.update = function () {
                $scope.allAssertions = state.assertions.all();
                //console.log("updateAssertions", $scope.allAssertions);
            };

        }
    };

});

