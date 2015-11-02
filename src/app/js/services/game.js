angular.module('mindgame').factory('game', game);

function game(gamePedicates,
              gameRoutines,
              gameThings) {

    var game = new BigMess();

    // Load various configuration modules
    gamePedicates(game);
    gameRoutines(game);
    gameThings(game);

    return game;

}



