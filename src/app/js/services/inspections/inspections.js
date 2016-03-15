yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      commentInspection,
                                      predicateReferenceInspection,
                                      objectReferenceInspection,
                                      relatedHelpInspection) {
    return [
        fileReferenceInspection,
        objectReferenceInspection,
        predicateReferenceInspection,
        commentInspection,
        textInspection,
        relatedHelpInspection
    ];
});