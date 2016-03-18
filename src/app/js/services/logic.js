// todo: Rename the "aboutTo" and "aboutToRoutine" to "intention"
yarn.service('logic', function (aboutToRoutine,
                                moveRoutine,
                                lookAroundRoutine,
                                inventoryRoutine,
                                takeRoutine,
                                useRoutine,
                                stepRoutine,
                                hintRoutine) {

    var routines = {
        aboutTo: aboutToRoutine,
        move: moveRoutine,
        use: useRoutine,
        inventory: inventoryRoutine,
        lookAround: lookAroundRoutine,
        take: takeRoutine,
        step: stepRoutine,
        hint: hintRoutine
    };

    routines.aboutTo = aboutToRoutine;

    return {
        routines: routines
    };
});

