yarn.directive('getContextMenu', function (globalContextMenu, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            $element.on("contextmenu", function (e) {
                e.preventDefault();
                $timeout(function () {
                    if (globalContextMenu.menuItems.length) {
                        var event = new Event('contextmenuexists');
                        event.clientX = e.clientX;
                        event.clientY = e.clientY;
                        $scope.contextMenuItems = globalContextMenu.menuItems;
                        $element[0].dispatchEvent(event);
                    }
                }, 300);
            });
        }
    };
});
