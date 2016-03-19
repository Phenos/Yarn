yarn.directive('graphTool', function CommandsTool(tools) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/graph.html',
        controller: Controller
    };

    function Controller($scope) {
        var self = this;
    }

});

