yarn.service("theme", function (Theme) {
    return new Theme();
});

yarn.service("Theme", function (state, things, yConsole, wallpaper) {

    function Theme() {
        this.wallpaper = new Wallpaper({
            brightness: "dark",
            color: "#000",
            image: null,
            style: "",
            layout: "fullscreen",
            effects: ""
        });
    }

    /**
     * Apply state changes according to the Theme specified by the current context
     * according to the room or story.
     * @param space
     */
    Theme.prototype.applyThemeFromContext = function (space) {
        //console.log("applyThemeFromContext", space);
        var themeId;

        if (space) {
            themeId = state.value("Space has Theme", {
                Space: space
            });
        }
        if (!themeId) {
            themeId = state.value("Story has Theme");
        }

        if (themeId) {

            var theme = things.get(themeId);
            state.applyObjectAsStageChange(theme);
            // TODO: Change old theme according to Brightness
            yConsole.log("Theme applied to : " + themeId);
        }

    };

    Theme.prototype.refresh = function () {
        var space = state.one("You is in *");
        this.applyThemeFromContext(space);

        /*
         Read the global state for new theme values
         */
        var wallpaperOptions = this.wallpaper;
        ifDefined(wallpaperOptions, "brightness", state.value("Wallpaper has Brightness"));
        ifDefined(wallpaperOptions, "color", state.value("Wallpaper has Color"));
        ifDefined(wallpaperOptions, "image", state.value("Wallpaper has Image"));
        ifDefined(wallpaperOptions, "style", state.value("Wallpaper has Style"));
        ifDefined(wallpaperOptions, "layout", state.value("Wallpaper has Layout"));
        ifDefined(wallpaperOptions, "effects", state.value("Wallpaper has Effects"));

        wallpaper.change(wallpaperOptions);
    };

    function ifDefined(object, key, value) {
        if (angular.isDefined(value)) {
            object[key] = value;
        }
    }

    function Wallpaper(options) {
        if (!angular.isObject(options)) options = {};
        this.brightness = options.brightness || "dark";
        this.color = options.color || "#000";
        this.style = options.style || "";
        this.layout = options.layout || "fullscreen";
        this.effects = options.effects || "";

        this.image = options.image || null;
        if (this.image) {
            this.image = script.resolveRelativeURI(this.image);
        }
    }

    return Theme;
});