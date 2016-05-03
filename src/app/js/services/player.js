yarn.service("player", function () {

    var service = {};

    service.register = function (controller) {
        service.controller = controller;
    };

    service.refresh = function () {
        if (service.controller) {
            service.controller.refresh();
        }
    };

    service.closeSidenav = function () {
//        console.log("closeSidenav");
        if (service.controller) {
            service.controller.closeSidenav();
        }
    };

    service.openSidenav = function () {
        if (service.controller) {
            service.controller.openSidenav();
        }
    };

    service.scroll = function (target) {
        if (service.controller) {
            service.controller.scroll(target);
        }
    };

    service.startStory = function () {
        if (service.controller) {
            service.controller.startStory();
        }
    };

    service.endStory = function () {
        if (service.controller) {
            service.controller.endStory();
        }
    };

    return service;

});