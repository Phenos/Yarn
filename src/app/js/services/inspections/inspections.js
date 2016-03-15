yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      commentInspection,
                                      predicateReferenceInspection,
                                      objectReferenceInspection,
                                      relatedHelpInspection) {
    return [
        textInspection,
        fileReferenceInspection,
        objectReferenceInspection,
        predicateReferenceInspection,
        commentInspection,
        relatedHelpInspection
    ];
});