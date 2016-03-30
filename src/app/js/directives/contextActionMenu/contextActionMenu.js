yarn.directive('contextActionMenu', function ContextActionMenuDirective($timeout, contextActionMenu) {
    return {
        restrict: 'E',
        bindToController: {
            thingIsA: "=",
            predicate: "="
        },
        scope: true,
        replace: true,
        controllerAs: 'menu',
        templateUrl: './html/contextActionMenu.html',
        controller: ContextActionMenuController
    };

    function ContextActionMenuController($element) {
        var self = this;
        this.visible = false;

        contextActionMenu.register(this);

        this.show = function () {
            console.log(".show");
            self.visible = true;
        };

        this.hide = function () {
            self.visible = false;
        };

        this.position = function (targetElement) {
            // We wait for the previously selected item to collapse before reading
            // the new position
            $timeout(function () {
                var top = targetElement[0].offsetTop;
                top = top + targetElement[0].offsetParent.offsetTop;
                top = top + targetElement[0].clientHeight;
                console.log("targetElement", targetElement);
                $element.css({
                    top: top
                });
            }, 50);
        }

    }
});

yarn.service('contextActionMenu', function contextActionMenuService() {

    var service = {
        controller: null
    };

    service.register = function (controller) {
        service.controller = controller;
    };

    service.hide = function () {
        service.controller && service.controller.hide();
    };

    service.show = function () {
        service.controller && service.controller.show();
    };

    service.position = function (targetElement) {
        service.controller && service.controller.position(targetElement);
    };


    return service;
});
