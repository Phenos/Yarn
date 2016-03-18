yarn.service('hintCommand', function (hintRoutine,
                                      aboutToRoutine) {

    function handler() {
        aboutToRoutine(false);
        hintRoutine()
    }

    return {
        name: "hint",
        shortDescription: "Restate where the player is and provide a hint if one is available.",
        longDescription: "Restate where the player is and provide a hint if one is available.",
        handler: handler
    };

});

