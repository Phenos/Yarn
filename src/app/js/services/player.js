yarn.service("player", function () {

    var service = {};

    service.register = function (controller) {
        service.controller = controller;
    };

    service.refresh = function () {
        if (service.controller) service.controller.refresh();
    };

    return service;

});