yarn.service("commandsTool", function (Tool) {
    return new Tool("commands", {
        label: "Log",
        icon: "commands",
        directive: "commands-tool",
        order: 100
    });
});