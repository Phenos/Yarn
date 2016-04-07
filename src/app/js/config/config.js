
yarn.value('duScrollCancelOnEvents', false);

yarn.config(function(RollbarProvider, $urlMatcherFactoryProvider) {
    var roolbarConfig = {
        accessToken: "6bec4cddb0c84186a2f437fa13b3f50e",
        captureUncaught: true,
        payload: {
            environment: 'test'
        }
    };

    $urlMatcherFactoryProvider.strictMode(false);

//    console.info("Configured Roolbar Error Reporting", [roolbarConfig]);
//    RollbarProvider.init(roolbarConfig);
});

yarn.run(function (commands, tools, keyboardShortcuts) {

    var path = "/public/js/ace/";
    ace.config.set('basePath', path);
    ace.config.set('modePath', path);
    ace.config.set('themePath', path);
    ace.config.set('workerPath', path);

    keyboardShortcuts.init();

    var buitInTools = [
        "projectTool",
//        "annotationsTool",
        "assertionsTool",
        "commandsTool",
        "graphTool",
        "inspectorTool",
        "validatorTool"
    ];
    console.info("Loading buil-in tools ", [buitInTools]);
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
        "doCommand",
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
