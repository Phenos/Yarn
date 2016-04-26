yarn.directive('tools', function ToolsDirective() {

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        template:'<div flex=grow layout=column><md-tabs flex=100 md-selected=toolTabs.selected ng-click=expandIfNotExpanded($event)><md-tab md-on-select=focus(tool) md-on-deselect=blur(tool) ng-repeat="tool in tools.all" md-active=tool.isFocused><md-tab-label><md-icon style="width: 1.5em; margin-left: 0.7em" md-svg-icon="./svg-icons/{{::tool.icon }}.svg"></md-icon>{{::tool.label }}</md-tab-label><md-tab-body><tool layout-fill is-focused=tool.isFocused directive=tool.directive></tool></md-tab-body></md-tab></md-tabs></div>',
        controller: ToolsController
    };

    function ToolsController($scope, tools, root) {
        $scope.tools = tools;

        $scope.expandIfNotExpanded = function () {
            root.toggleTools(true)
        };
        $scope.focus = function (tool) {
            tools.focus(tool.id, true)
        };
        $scope.blur = function (tool) {
        };
    }

});

