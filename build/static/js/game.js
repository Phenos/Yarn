angular.module('mindgame').factory('game', game);

function game() {

    var game = new MindGame();

    return {
        game: game,
        bigMess: game.bigMess,
        state: game.bigMess.state
    };

}



