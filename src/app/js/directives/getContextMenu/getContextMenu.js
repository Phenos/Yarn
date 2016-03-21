yarn.directive('getContextMenu', function (globalContextMenu) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            $element.on("contextmenu", function (e) {
                if (globalContextMenu.menuItems.length) {
                    e.preventDefault();
                    $scope.contextMenuItems = globalContextMenu.flush();
                    //console.log("contextmenuexists!!!");
                    var event = new Event('contextmenuexists');
                    event.clientX = e.clientX;
                    event.clientY = e.clientY;
                    $element[0].dispatchEvent(event);
                }
            });
        }
    };
});
