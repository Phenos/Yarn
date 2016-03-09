(function() {

yarn.directive('logItem', LogItemDirective);

function LogItemDirective() {
    return {
        restrict: 'E',
        bindToController: {
            scope: '=',
            type: '=',
            text: '='
        },
        scope: {},
        controllerAs: 'logItem',
        controller: LogItemController
    };

    function LogItemController($scope, $element, $compile) {
        var self = this;

        angular.extend($scope, this.scope);

        $scope.$watch('logItem.text', function(value) {
            var logItemEl = $compile("<div class='logItem is-" + self.type + "'>" + value + "<div>")($scope);
            $element.append(logItemEl);
        });

    }
}

})();
