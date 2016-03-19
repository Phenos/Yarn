yarn.service("assertionsTool", function (Tool) {
    return new Tool("assertions", {
        label: "Assertions",
        icon: "assertions",
        directive: "assertions-tool"
    });
});