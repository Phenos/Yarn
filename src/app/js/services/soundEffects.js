yarn.factory('soundEffects', function (ngAudio) {

    var tapSound = ngAudio.load("./sounds/tap.mp3");

    function tap() {
        tapSound.volume = 0.2;
        tapSound.currentTime = 0.01;
        tapSound.play();
    }

    var errorSound = ngAudio.load("./sounds/error.mp3");

    function error() {
        errorSound.play();
    }

    return {
        tap: tap,
        error: error
    }
});
