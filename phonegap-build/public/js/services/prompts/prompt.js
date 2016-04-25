yarn.factory("Prompt", function (PromptOption) {

    function Prompt() {
        this.question = "";
        this.options = [];
        this.optionsRef = {};
    }

    Prompt.prototype.option = function (label, value) {
        var option = new PromptOption(label, value);
        this.options.push(option);
        this.optionsRef[value] = option;
        return option;
    };

    return Prompt;
});