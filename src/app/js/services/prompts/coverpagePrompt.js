yarn.service("coverpagePrompt", function (commands,
                                          state) {

    function coverpagePrompt(context) {

        context.when = function () {
            return state.step() === 0;
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "Do you want to begin this story";
            prompt.option("Begin story", "beginstory");
        };

        context.answer = function answer(promptLoop, option) {
            if (option && option.value === "beginstory") {
                commands.command("beginstory");
            }
        };
    }

    return coverpagePrompt;
});

