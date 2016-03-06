yarn.factory('refreshCommand', function (player,
                                         aboutToRoutine) {

    function handler() {
        aboutToRoutine(false);
        player.refresh();
    }

    return {
        name: "refresh",
        shortDescription: "Clear and refresh the player log.",
        longDescription: "Clear and refresh the player log.",
        handler: handler
    };

});

