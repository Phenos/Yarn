/**
 * Class used for applying changes to the Wallpaper ui
 * @name Wallpaper
 * @param {Object} options A set of options to configure the wallpaper.
 * @class
 */
yarn.service("Wallpaper", function (yarnScript) {
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
        self.colorMask = options.colorMask || 0;
        if (self.image) {
            self.image = yarnScript.resolveRelativeURI(this.image);
        }
    }
    return Wallpaper;
});
