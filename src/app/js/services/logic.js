// todo: Rename the "aboutTo" and "aboutToRoutine" to "intention"
yarn.service('logic', function (aboutToRoutine,
                                moveRoutine,
                                takeRoutine,
                                useRoutine,
                                stepRoutine) {

    var routines = {
        aboutTo: aboutToRoutine,
        move: moveRoutine,
        use: useRoutine,
        take: takeRoutine,
        step: stepRoutine
    };

    routines.aboutTo = aboutToRoutine;

    return {
        routines: routines
    };
});

