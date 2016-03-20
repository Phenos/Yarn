yarn.service("Tool", function () {

    function Tool(id, options) {
        this.id = id;
        this.label = options.label;
        this.order = options.order || 0;
        this.icon = options.icon;
        this.directive = options.directive;
        this.options = options;
        this.isFocused = false;
    }

    Tool.prototype.focus = function () {
        this.isFocused = true;
    };

    Tool.prototype.blur = function () {
        this.isFocused = false;
    };

    return Tool;

});