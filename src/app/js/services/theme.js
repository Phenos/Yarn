/**
 * Class used for keeping track of which visual theme to use in a story and in spaces
 * @name Theme
 * @class
 */
yarn.service("Theme", function (state, things, yConsole, wallpaper, Wallpaper) {

    function Theme() {
        var self = this;

        /**
         * Wallpaper for this theme
         * @name wallpaper
         * @memberof Theme
         * @type {Wallpaper}
         */
        self.wallpaper = new Wallpaper({
            brightness: "dark",
            color: "#000",
            image: null,
            colorMask: 0,
            style: "",
            layout: "fullscreen",
            effects: ""
        });
    }

    /**
     * Obtain and apply the theme for the current context (story or space).
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


        // Todo: only output theme change to console is some value has actually changed
        // This requires that the "applyObjectAsStageChange" returns some status
        if (angular.isString(themeId)) {
            var theme = things.get(themeId);
            state.applyObjectAsStageChange(theme);
            yConsole.log("Theme applied : " + themeId);
        } else {
            console.error("Error occured while rendering template: \n" +
                themeId.message)
        }

    };

    function ifDefined(object, key, value) {
        if (angular.isDefined(value) && value !== null) {
            object[key] = value;
        }
    }

    /**
     * Refresh the Theme and UI with the latest values found in the game state.
     * @memberof Theme
     * @returns {undefined}
     */
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
        ifDefined(wallpaperOptions, "colorMask", state.value("Wallpaper has Color Mask"));
        ifDefined(wallpaperOptions, "style", state.value("Wallpaper has Style"));
        ifDefined(wallpaperOptions, "layout", state.value("Wallpaper has Layout"));
        ifDefined(wallpaperOptions, "effects", state.value("Wallpaper has Effects"));

        wallpaper.change(wallpaperOptions);
    };

    return Theme;
});