yarn.directive('assertionsTool', function AssertionsTool() {

    return {
        restrict: 'E',
        scope: {
            isFocused: "="
        },
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
                console.log("updateAssertions", $scope.allAssertions);
                $scope.allAssertions = state.assertions.all();
            };

        }
    };

});

