
yarn.config(function(RollbarProvider) {
    var roolbarConfig = {
        //accessToken: "6bec4cddb0c84186a2f437fa13b3f50e",
        accessToken: "INVALID",
        captureUncaught: true,
        payload: {
            environment: 'test'
        }
    };
    console.info("Configured Roolbar Error Reporting", [roolbarConfig]);
    //RollbarProvider.init(roolbarConfig);
});

yarn.run(function (commands, tools) {

    var path = "/public/js/ace/";
    ace.config.set('basePath', path);
    ace.config.set('modePath', path);
    ace.config.set('themePath', path);
    ace.config.set('workerPath', path);

    var buitInTools = [
        "projectTool",
        //"annotationsTool",
        "assertionsTool",
        "commandsTool",
        "graphTool",
        "inspectorTool",
        "validatorTool"
    ];

    tools.load(buitInTools);

    var builtInCommands = [
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
        "creditsCommand",
        "lookCommand",
        "takeCommand",
        "moveCommand",
        "restartCommand",
        "inventoryCommand",
        "stateCommand",
        "treeCommand",
        "tokensCommand",
        "helpCommand"
    ];
    console.info("Loading buil-in commands ", [builtInCommands]);
    commands.load(builtInCommands);

});
