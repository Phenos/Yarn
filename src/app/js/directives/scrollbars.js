yarn.directive('scrollbars', function () {
    return {
        restrict: 'EA',
        controller: scrollbarsController
    };

    function scrollbarsController($scope, $element) {
        var container = jQuery($element[0]);

        $scope.$on("refreshScrollbars", function () {
            container.perfectScrollbar('update');
        });

        container.perfectScrollbar({});
    }
});