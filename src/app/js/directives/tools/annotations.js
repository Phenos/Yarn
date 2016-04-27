yarn.directive('annotationsTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/annotations.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});

