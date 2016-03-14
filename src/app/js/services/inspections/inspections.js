yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      commentInspection,
                                      predicateReferenceInspection,
                                      objectReferenceInspection) {
    return [
        textInspection,
        fileReferenceInspection,
        objectReferenceInspection,
        predicateReferenceInspection,
        commentInspection
    ];
});