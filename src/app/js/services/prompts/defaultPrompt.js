yarn.service("defaultPrompt", function (commands,
                                        state,
                                        stateHelpers,
                                        setDefaultOptionsHelper) {

    function defaultPrompt(context) {

        context.when = function () {
            return state.step() > 0;
        };

        context.question = function (promptLoop, prompt) {

            prompt.question = "What do you want to do ?";

            setDefaultOptionsHelper(prompt, false);

        };

        context.answer = function answer(promptLoop, option) {
            //console.trace(".answer for WhatToDo");
            // todo: this should be injected instead of taken from parent scope
            if (option && option.value === "aboutTo take") {
                commands.command("playerInventory");
            }
            if (option && option.value) {
                commands.command(option.value);
            }
            //console.log("defaultPrompt Answer: ", option.value);
        };

    }

    return defaultPrompt;
});

