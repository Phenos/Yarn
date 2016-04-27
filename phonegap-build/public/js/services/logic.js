// todo: Rename the "aboutTo" and "aboutToRoutine" to "intention"
yarn.service('logic', function (aboutToRoutine,
                                moveRoutine,
                                lookAroundRoutine,
                                inventoryRoutine,
                                lookAtExitsRoutine,
                                actSceneRoutine,
                                talkAboutRoutine,
                                talkToRoutine,
                                doRoutine,
                                takeRoutine,
                                useRoutine,
                                hintRoutine) {

    var routines = {
        aboutTo: aboutToRoutine,
        move: moveRoutine,
        use: useRoutine,
        inventory: inventoryRoutine,
        do: doRoutine,
        talkAbout: talkAboutRoutine,
        actScene: actSceneRoutine,
        talkTo: talkToRoutine,
        lookAround: lookAroundRoutine,
        lookAtExits: lookAtExitsRoutine,
        take: takeRoutine,
        hint: hintRoutine
    };

    routines.aboutTo = aboutToRoutine;

    return {
        routines: routines
    };
});

