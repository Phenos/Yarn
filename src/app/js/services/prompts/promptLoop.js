yarn.service('promptLoop', function (PromptLoop,
                                     coverpagePrompt,
                                     movePrompt,
                                     usePrompt,
                                     inventoryPrompt,
                                     lookPrompt,
                                     theEndPrompt,
                                     defaultPrompt) {

    // Create an instant of the promptLoop
    var promptLoop = new PromptLoop();

    // NOTE: The order is important here. The "WhatToDo" must be after other options

    promptLoop.addContext("TheEnd", theEndPrompt);
    promptLoop.addContext("WhatToUse", usePrompt);
    promptLoop.addContext("WhereToGo", movePrompt);
    promptLoop.addContext("WhatToLookAt", lookPrompt);
    promptLoop.addContext("inventory", inventoryPrompt);
    promptLoop.addContext("WhatToDo", defaultPrompt);
    promptLoop.addContext("Coverpage", coverpagePrompt);

    //console.log("Created a new prompt loop", promptLoop);

    return promptLoop;
});