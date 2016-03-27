yarn.directive('tools', function ToolsDirective() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: './html/tools.html',
        controller: ToolsController
    };

    function ToolsController($scope, tools, root) {
        $scope.tools = tools;

        $scope.expandIfNotExpanded = function () {
            root.toggleTools(true)
        };
        $scope.focus = function (tool) {
            tools.focus(tool.id, true)
        }
    }

});

