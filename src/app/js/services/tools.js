
yarn.service("tools", function toolsService ($injector, state) {

    function Tools () {
        this.all = [];
        this.index = {};
    }

    Tools.prototype.focusFromMemory = function () {
        var storage = state.getStoryLocalStorage("tools");
        var toolId = storage.lastOpenTool;
        if (toolId) this.focus(toolId);
        console.log("focusFromMemory", toolId);
    };

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

    Tools.prototype.get = function (id) {
        return this.index[id];
    };

    Tools.prototype.focus = function (id) {
        console.log("focus", id);
        var storage = state.getStoryLocalStorage("tools");
        storage.lastOpenTool = id;
        angular.forEach(this.all, function (tool) {
            if (tool.id === id) {
                tool.focus();
            } else {
                tool.blur();
            }
        });
    };

    return new Tools();
});