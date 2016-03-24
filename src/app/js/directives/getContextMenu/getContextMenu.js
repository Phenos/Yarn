yarn.directive('getContextMenu', function (globalContextMenu, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            $element.on("contextmenu", function (e) {
                if (!e.altKey) {
                    e.preventDefault();
                    $timeout(function () {
                        if (globalContextMenu.menuItems.length) {
                            var event = new Event('contextmenuexists');
                            event.clientX = e.clientX;
                            event.clientY = e.clientY;
                            globalContextMenu.element[0].dispatchEvent(event);
                        }
                    }, 300);
                }
            });
        }
    };
});
