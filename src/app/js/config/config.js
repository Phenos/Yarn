
yarn.config(function (LoopBackResourceProvider) {
    console.log("Loading app configuration");
    // Use a custom auth header instead of the default 'Authorization'
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('/api');

});



yarn.run(function ($rootScope,
                                     commandsRegistry) {
    $rootScope.breakpoints = {
        //0: 'isMobileWidth',
        //480: 'isMobileLandscapeWidth',
        //641: 'isTabletWidth',
        //1025: 'isDesktopWidth',
        //1281: 'isWidescreenLayout'
    };

    commandsRegistry.load([
        "inventoryPlayerCommand",
        "beginStoryCommand",
        "inspectCommand",
        "aboutToCommand",
        "clearCommand",
        "loadCommand",
        "graphCommand",
        "useCommand",
        "moveCommand",
        "restartCommand",
        "inventoryCommand",
        "stateCommand",
        "treeCommand",
        "tokensCommand",
        "helpCommand"
    ]);

});
