yarn.config(function (LoopBackResourceProvider) {
    console.log("Loading app configuration");
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('/api');

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
