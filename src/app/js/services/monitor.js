yarn.service("Monitor", function (monitors) {

    function Monitor(id, label) {
        this.id = id;
        this.label = label;
        this.visible = false;
        this.meta = {};
        this.data = {};
        monitors.register(this);
    }

    Monitor.prototype.update = function (data) {
        angular.extend(this.data, data);
    };

    Monitor.prototype.show = function () {
        this.visible = true;
    };

    Monitor.prototype.hide = function () {
        this.visible = false;
    };

    return Monitor;

});
