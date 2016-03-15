
yarn.config(function(RollbarProvider) {
    var roolbarConfig = {
        //accessToken: "6bec4cddb0c84186a2f437fa13b3f50e",
        accessToken: "INVALID",
        captureUncaught: true,
        payload: {
            environment: 'test'
        }
    };
    console.log("Configured Roolbar Error Reporting", [roolbarConfig]);
    RollbarProvider.init(roolbarConfig);
});

yarn.run(function (commandsRegistry) {

    commandsRegistry.load([
        "inventoryPlayerCommand",
        "beginStoryCommand",
        "inspectCommand",
        "aboutToCommand",
        "evalCommand",
        "clearCommand",
        "loadCommand",
        "graphCommand",
        "hintCommand",
        "useCommand",
        "validateCommand",
        "lookCommand",
        "takeCommand",
        "moveCommand",
        "restartCommand",
        "inventoryCommand",
        "stateCommand",
        "treeCommand",
        "tokensCommand",
        "helpCommand"
    ]);

});
