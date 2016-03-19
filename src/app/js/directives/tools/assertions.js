yarn.directive('assertionsTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/assertions.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});

