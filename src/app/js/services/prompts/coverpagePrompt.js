yarn.service("coverpagePrompt", function (commands,
                                          state,
                                          assert) {

    function coverpagePrompt(context) {

        context.when = function () {
            return state.step() === 0;
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "Do you want to begin this story";
            prompt.option("Start", "beginstory");

            var credits = state.resolveValue(assert("Story", "has", "Credits"));
            if (credits) {
                prompt.option("Credits", "credits");
            }
        };

        context.answer = function answer(promptLoop, option) {
            if (option) {
                commands.run(option.value);
            }
        };
    }

    return coverpagePrompt;
});

