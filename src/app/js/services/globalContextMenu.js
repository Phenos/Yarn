yarn.service("globalContextMenu", function () {
    var service = {
        element: null,
        menuItems: []
    };

    service.register = function (scope, element) {
        scope.globalContextMenu = this;
        this.element = element;
    };

    service.flush = function () {
        var menuItems = service.menuItems;
        service.menuItems = [];
        return menuItems;
    };

    service.add = function (label, icon, callback) {
        service.menuItems.push({
            label: label,
            icon: icon,
            click: callback
        });
    };

    return service;
});
