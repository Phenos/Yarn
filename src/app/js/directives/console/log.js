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

    function LogController($scope, $element) {
        var self = this;

        $scope.$watch('log.text', function(value) {
            console.log("element", $element);
            $element.addClass("is-" + self.type);
            $element[0].innerHTML = value;
        });

    }
}

})();
