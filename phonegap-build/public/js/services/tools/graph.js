yarn.service("graphTool", function (Tool) {
    return new Tool("graph", {
        label: "Graph",
        icon: "graph",
        directive: "graph-tool"
    });
});