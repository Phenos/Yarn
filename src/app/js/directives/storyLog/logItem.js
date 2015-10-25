(function() {

angular.module('mindgame').directive('logItem', LogItemDirective);

function LogItemDirective($sce) {
    return {
        restrict: 'E',
        bindToController: {
            text: '='
        },
        scope: {},
        controllerAs: 'logItem',
        template: '<div class="logItem"></div>',
        controller: LogItemController
    };

    function LogItemController($scope, $element) {

        $scope.$watch('logItem.text', function(value) {
            $element[0].innerHTML = "<div class='logItem'>" + value + "<div>";
        });

        console.log('LogItemController');
    }
}

})();
