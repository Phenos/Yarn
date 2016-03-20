yarn.directive('tools', function ToolsDirective() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools.html',
        controller: ToolsController
    };

    function ToolsController($scope, tools) {
        $scope.tools = tools;

        $scope.focus = function (tool) {
            tools.focus(tool.id)
        }
    }

});

