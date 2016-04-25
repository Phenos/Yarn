yarn.service("projectTool", function (Tool) {
    return new Tool("project", {
        label: "Project",
        icon: "project",
        directive: "project-tool",
        order: 300
    });
});