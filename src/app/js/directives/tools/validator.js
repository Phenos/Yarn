yarn.directive('validatorTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/validator.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});

