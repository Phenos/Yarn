yarn.service("inspectorTool", function (Tool) {
    return new Tool("inspector", {
        label: "Inspector",
        icon: "inspector",
        directive: "inspector-tool",
        order: 120
    });
});