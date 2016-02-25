yarn.service('promptLoop', function (PromptLoop,
                                     coverpagePrompt,
                                     movePrompt,
                                     usePrompt,
                                     takePrompt,
                                     lookPrompt,
                                     defaultPrompt) {

    // Create an instant of the promptLoop
    var promptLoop = new PromptLoop();

    // NOTE: The order is important here. The "WhatToDo" must be after other options
    promptLoop.addContext("WhatToUse", usePrompt);
    promptLoop.addContext("WhereToDo", movePrompt);
    promptLoop.addContext("WhatToLookAt", lookPrompt);
    promptLoop.addContext("WhatToTake", takePrompt);
    promptLoop.addContext("WhatToDo", defaultPrompt);
    promptLoop.addContext("Coverpage", coverpagePrompt);

    //console.log("Created a new prompt loop", promptLoop);

    return promptLoop;
});