// todo: Rename the "aboutTo" and "aboutToRoutine" to "intention"
yarn.service('logic', function (aboutToRoutine,
                                moveRoutine,
                                lookAroundRoutine,
                                inventoryRoutine,
                                lookAtExitsRoutine,
                                actSceneRoutine,
                                talkAboutRoutine,
                                talkToRoutine,
                                thinkAboutRoutine,
                                listRoutine,
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
        thinkAbout: thinkAboutRoutine,
        actScene: actSceneRoutine,
        talkTo: talkToRoutine,
        lookAround: lookAroundRoutine,
        lookAtExits: lookAtExitsRoutine,
        list: listRoutine,
        take: takeRoutine,
        hint: hintRoutine
    };

    return {
        routines: routines
    };
});

