yarn.directive('assertionsTool', function AssertionsTool() {

    return {
        restrict: 'E',
        scope: {
            isFocused: "="
        },
        replace: true,
        templateUrl: './html/tools/assertions.html',
        controller: function Controller($scope, state, channel) {
            $scope.allAssertions = [];

            channel.subscribe("runtine.afterRun", function () {
                $scope.update();
            });

            $scope.update = function () {
                //console.log("updateAssertions", $scope.allAssertions);
                $scope.allAssertions = state.assertions.all();
            };

        }
    };

});

