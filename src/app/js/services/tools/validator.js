yarn.service("validatorTool", function (Tool) {
    return new Tool("validator", {
        label: "Validator",
        icon: "validate",
        directive: "validator-tool",
        order: 90
    });
});