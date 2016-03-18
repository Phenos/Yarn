yarn.service("themes", function themes() {

    function Themes() {
        this.current = null;

        this.all = {
            default: {
                id: "default"
            },
            light: {
                id: "light"
            },
            dark: {
                id: "dark"
            }
        };
        this.select("default");
    }

    Themes.prototype.select = function (id) {
        var theme = this.all[id];
        if (theme) {
            this.current = theme;
        }
        return this.current;
    };

    return new Themes();

});

