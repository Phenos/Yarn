yarn.service("assertionsTool", function (Tool) {
    return new Tool("assertions", {
        label: "Statements",
        icon: "assertions",
        directive: "assertions-tool"
    });
});