yarn.service("annotationsTool", function (Tool) {
    return new Tool("annotations", {
        label: "Annotations",
        icon: "annotations",
        directive: "annotations-tool"
    });
});