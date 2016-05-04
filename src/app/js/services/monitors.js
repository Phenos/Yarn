yarn.service("monitors", function () {

    function Monitors() {
        this.visible = false;
        this.items = [];
    }

    Monitors.prototype.register = function (monitor) {
        this.items.push(monitor);
    };

    Monitors.prototype.show = function () {
        this.visible = true;
    };

    Monitors.prototype.hide = function () {
        this.visible = false;
    };

    return new Monitors();

});
