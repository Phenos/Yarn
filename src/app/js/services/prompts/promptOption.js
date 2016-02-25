yarn.factory("PromptOption", function () {

    function PromptOption(label, value) {
        this.label = label;
        this.value = value;
        this.iconId = "";
        this.iconOnly = false;
    }

    return PromptOption;
});