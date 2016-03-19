
yarn.service("tools", function toolsService ($injector) {

    function Tools () {
        this.all = [];
        this.index = {};
    }

    Tools.prototype.add = function (tool) {
        this.all.push(tool);
        this.index[tool.id] = tool;
        this.all.sort(function (toolA, toolB) {
            return toolB.order - toolA.order;
        });
    };

    Tools.prototype.load = function (tools) {
        var self = this;
        //console.log("Loading commands into command registry", commands);
        angular.forEach(tools, function (toolServiceName) {
            var tool = $injector.get(toolServiceName);
            self.add(tool);
        });
    };

    return new Tools();
});