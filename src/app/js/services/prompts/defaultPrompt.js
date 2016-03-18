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
        context.use = function(thing) {
            commands.command("look " + thing.id);
        };
        context.answer = function answer(promptLoop, option) {
            if (option && option.value) {
                commands.command(option.value);
            }
            //console.log("defaultPrompt Answer: ", option.value);
        };

    }

    return defaultPrompt;
});

