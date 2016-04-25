yarn.service("inspections", function (fileReferenceInspection,
                                      textInspection,
                                      commentInspection,
                                      occurencesInspection,
                                      templateInspection,
                                      punctuationInspection,
                                      predicateReferenceInspection,
                                      objectReferenceInspection,
                                      relatedHelpInspection) {
    return [
        fileReferenceInspection,
        objectReferenceInspection,
        templateInspection,
        predicateReferenceInspection,
        commentInspection,
        punctuationInspection,
        textInspection,
        relatedHelpInspection,
        occurencesInspection
    ];
});