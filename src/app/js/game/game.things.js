yarn.factory('gameThings', function(state) {

    return function gameThings() {

        state.thing("player");
        state.thing("person");
        state.thing("room");
        state.thing("object");
    }

});

