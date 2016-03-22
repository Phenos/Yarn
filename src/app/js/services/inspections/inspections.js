yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      commentInspection,
                                      occurencesInspection,
                                      predicateReferenceInspection,
                                      objectReferenceInspection,
                                      relatedHelpInspection) {
    return [
        fileReferenceInspection,
        objectReferenceInspection,
        predicateReferenceInspection,
        commentInspection,
        textInspection,
        relatedHelpInspection,
        occurencesInspection
    ];
});