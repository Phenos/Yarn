yarn.directive('graphTool', function CommandsTool(graph) {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools/graph.html',
        controller: Controller
    };

    function Controller($scope) {
        $scope.graph = graph;
    }

});

