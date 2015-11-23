(function() {

angular.module('mindgame').directive('log', LogDirective);

function LogDirective($sce) {
    return {
        restrict: 'E',
        bindToController: {
            type: '=',
            text: '='
        },
        scope: {},
        controllerAs: 'log',
        template: '',
        controller: LogController
    };

    function LogController($scope, $element, $compile) {
        var self = this;

        $scope.$watch('log.text', function(value) {
            console.log("element", $element);
            console.log("value", value);
            $element.addClass("is-" + self.type);
            var elem = $compile("<div>" + value + "</div>")($scope);
            console.log("elem: ", elem);
            $element.append(elem);
        });

    }
}

})();
