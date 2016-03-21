yarn.service("commandsTool", function (Tool) {
    return new Tool("commands", {
        label: "Commands",
        icon: "commands",
        directive: "commands-tool",
        order: 100
    });
});