yarn.service("inspections", function (fileReferenceInspection,
                                      objectReferenceInspection) {
    return [
        fileReferenceInspection,
        objectReferenceInspection
    ];
});