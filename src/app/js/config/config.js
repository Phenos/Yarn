yarn.config(function (LoopBackResourceProvider) {
    console.log("Loading app configuration");
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('/api');

});

yarn.config(function(RollbarProvider) {
    var roolbarConfig = {
        accessToken: "6bec4cddb0c84186a2f437fa13b3f50e",
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
        "useCommand",
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
