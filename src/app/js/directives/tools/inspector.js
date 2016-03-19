yarn.directive('inspectorTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/inspector.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});

