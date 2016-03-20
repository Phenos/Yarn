yarn.directive('validatorTool', function CommandsTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/validator.html',
        controller: Controller
    };

    function Controller($scope, validator, state) {

        $scope.results = validator.results;

        postal.subscribe({
            channel: "validator",
            topic: "results",
            callback: function (results) {
                $scope.results = results;
            }
        });

        $scope.update = function () {
            validator.run();
            console.log("results", $scope.results);
        };
    }

});

