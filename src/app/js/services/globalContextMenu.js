yarn.service("globalContextMenu", function () {
    var service = {
        menuItems: []
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
