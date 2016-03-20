yarn.directive('validatorTool', function CommandsTool() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/validator.html',
        controller: Controller
    };

    function Controller($scope, validator, state) {
        //var results = validator.run(state);
        ////console.log("Validation results", results.all);
        //yConsole.log([
        //    "Validator executed " + results.all.length + " tests  :  ",
        //    results.pass.length, " Passed  /  ",
        //    results.fail.length + " Errors  /  ",
        //    results.warnings.length, " Warnings "].join(""));
        //if (results.fail.length > maxResults) {
        //    limitMessage = " Showing the first <strong>" + maxResults + "</strong> items";
        //}
        //if (results.fail.length > 0) {
        //    yConsole.error("Validation failed with " + results.fail.length + " errors. " + limitMessage);
        //} else {
        //    if (results.warnings.length) {
        //        yConsole.success("Validation passed with " + results.warnings.length + " warnings. " + limitMessage);
        //    } else {
        //        yConsole.success("Validation passed");
        //    }
        //}

        $scope.update = function () {
            $scope.results = validator.run(state);
            console.log("results", $scope.results);
        };

        $scope.update();
    }

});

