yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      objectReferenceInspection) {
    return [
        textInspection,
        fileReferenceInspection,
        objectReferenceInspection
    ];
});