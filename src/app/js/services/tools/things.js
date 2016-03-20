yarn.service("thingsTool", function thingsToolService(Tool) {
    return new Tool("things", {
        label: "Things",
        icon: "thing",
        directive: "things-tool",
        order: 120
    });
});