yarn.service("Tool", function () {

    function Tool(id, options) {
        this.id = id;
        this.label = options.label;
        this.order = options.order || 0;
        this.icon = options.icon;
        this.directive = options.directive;
        this.options = options;
    }

    return Tool;

});