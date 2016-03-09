yarn.service("theEndPrompt", function (commands,
                                       assert,
                                       state) {

    function theEndPrompt(context) {

        context.when = function () {
            var storyHasEnded = state.resolveValue(assert("Story", "has", "Ended"));
            //console.log("storyHasEnded", storyHasEnded);
            return storyHasEnded;
        };

        context.question = function (promptLoop, prompt) {
            prompt.question = "What do you want to do?";
            prompt.option("Restart", "restart");
        };

        context.answer = function answer(promptLoop, option) {
            if (option && option.value === "restart") {
                commands.command("restart");
            }
        };
    }

    return theEndPrompt;
});

