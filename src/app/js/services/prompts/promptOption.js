yarn.factory("PromptOption", function () {

    function PromptOption(label, value) {
        this.label = label;
        this.value = value;
        this.iconId = "";
        this.iconSize = "mini";
        this.iconOnly = false;

        this.iconStyle = function () {
            var className = "";
            if (this.iconOnly) {
                if (this.iconSize === "mini") {
                    className = "md-fab md-mini";
                } else if (this.iconSize === "large") {
                    className = "md-fab large";
                } else {
                    className = "md-fab";
                }
            } else {
                className = 'md-raised';
            }
            return className;
        };
    }

    return PromptOption;
});