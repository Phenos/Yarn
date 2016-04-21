yarn.directive('validatorTool', function CommandsTool(channel) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/validator.html',
        controller: Controller
    };

    function Controller($scope, validator) {

        $scope.results = validator.results;

        channel.subscribe("validator.results", function (results) {
            $scope.results = results;
        });

        $scope.update = function () {
            validator.run();
            console.log("results", $scope.results);
        };
    }

});

