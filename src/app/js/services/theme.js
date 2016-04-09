/**
 * Global instance of the current theme
 * @name theme
 * @class
 */
yarn.service("theme", function (Theme) {
    return new Theme();
});

/**
 * Class used for applying changes to the Wallpaper ui
 * @name Wallpaper
 * @param {Object} options A set of options to configure the wallpaper.
 * @class
 */
yarn.service("Wallpaper", function (script) {
    function Wallpaper(options) {
        var self = this;

        if (!angular.isObject(options)) {
            options = {};
        }
        self.brightness = options.brightness || "dark";
        self.color = options.color || "#000";
        self.style = options.style || "";
        self.layout = options.layout || "fullscreen";
        self.effects = options.effects || "";

        self.image = options.image || null;
        if (self.image) {
            self.image = script.resolveRelativeURI(this.image);
        }
    }
    return Wallpaper;
});

/**
 * Class used for keeping track of which visual theme to use in a story and in spaces
 * @name Theme
 * @class
 */
yarn.service("Theme", function (state, things, yConsole, wallpaper, Wallpaper) {

    function Theme() {
        var self = this;

        self.wallpaper = new Wallpaper({
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
     * @memberof Theme
     * @param {Object} space The space from which the theme should be read.
     * @returns {undefined}
     */
    Theme.prototype.applyThemeFromContext = function (space) {
//        console.log("applyThemeFromContext", space);
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

    function ifDefined(object, key, value) {
        if (angular.isDefined(value)) {
            object[key] = value;
        }
    }

    Theme.prototype.refresh = function () {
        var self = this;

        var space = state.one("Player is in *");
        self.applyThemeFromContext(space);

        /*
         Read the global state for new theme values
         */
        var wallpaperOptions = self.wallpaper;
        ifDefined(wallpaperOptions, "brightness", state.value("Wallpaper has Brightness"));
        ifDefined(wallpaperOptions, "color", state.value("Wallpaper has Color"));
        ifDefined(wallpaperOptions, "image", state.value("Wallpaper has Image"));
        ifDefined(wallpaperOptions, "style", state.value("Wallpaper has Style"));
        ifDefined(wallpaperOptions, "layout", state.value("Wallpaper has Layout"));
        ifDefined(wallpaperOptions, "effects", state.value("Wallpaper has Effects"));

        wallpaper.change(wallpaperOptions);
    };

    return Theme;
});