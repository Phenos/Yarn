yarn.service('logic', function (aboutToRoutine,
                                moveRoutine,
                                useRoutine,
                                stepRoutine) {

    var routines = {
        aboutTo: aboutToRoutine,
        move: moveRoutine,
        use: useRoutine,
        step: stepRoutine
    };

    routines.aboutTo = aboutToRoutine;

    return {
        routines: routines
    };
});

