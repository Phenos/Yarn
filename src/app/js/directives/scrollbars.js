yarn.directive('scrollbars', function () {
    return {
        restrict: 'EA',
        //bindToController: {},
        //scope: {},
        controller: scrollbarsController
    };

    function scrollbarsController($element) {
        console.log("$element[0]", $element[0]);
        jQuery($element[0]).perfectScrollbar({});
    }
});
