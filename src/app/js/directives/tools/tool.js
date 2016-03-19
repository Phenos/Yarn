yarn.directive('tool', function ToolsDirective() {

    return {
        restrict: 'E',
        scope: {
            directive: "="
        },
        replace: true,
        controller: ToolsController
    };

    function ToolsController($scope, $element, $compile) {
        var scope = $scope.$new(false);
        var toolElement = $compile("<" + $scope.directive + "></" + $scope.directive + ">")(scope);
        $element.append(toolElement);
    }

});

