(function() {

yarn.directive('logItem', LogItemDirective);

function LogItemDirective() {
    return {
        restrict: 'E',
        bindToController: {
            item: '='
        },
        scope: {},
        controllerAs: 'logItem',
        controller: LogItemController
    };

    function LogItemController($scope, $element, $compile) {
        angular.extend($scope, this.scope);

        var logItemEl = $compile(
            "<div id='logItem-" + this.item.number + "' class='logItem unread is-" +
            this.item.type + "'>" + this.item.text + "<div>"
        )($scope);
        $element.append(logItemEl);

    }
}

})();
