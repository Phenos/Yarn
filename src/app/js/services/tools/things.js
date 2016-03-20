yarn.service("thingsTool", function (Tool) {
    return new Tool("things", {
        label: "Things",
        icon: "thing",
        directive: "things-tool",
        order: 120
    });
});