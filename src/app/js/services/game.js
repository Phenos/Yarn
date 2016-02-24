yarn.service('game', function (yarn,
                               gamePedicates,
                               gameRoutines,
                               gameThings) {

    // Load various configuration modules
    gamePedicates(yarn);
    gameRoutines(yarn);
    gameThings(yarn);

    return yarn;
});
