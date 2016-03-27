yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      commentInspection,
                                      occurencesInspection,
                                      punctuationInspection,
                                      predicateReferenceInspection,
                                      objectReferenceInspection,
                                      relatedHelpInspection) {
    return [
        fileReferenceInspection,
        objectReferenceInspection,
        predicateReferenceInspection,
        commentInspection,
        punctuationInspection,
        textInspection,
        relatedHelpInspection,
        occurencesInspection
    ];
});