yarn.service('game', function (yarn,
                               gamePedicates,
                               gameRoutines) {

    // Load various configuration modules
    gamePedicates(yarn);
    gameRoutines(yarn);

    return yarn;
});
