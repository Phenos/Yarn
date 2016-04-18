yarn.service('wallpaper', function wallpaper(state, yarnScript, assert) {

    function Wallpaper() {
        this.options = "";
    }

    Wallpaper.prototype.onChangeFn = function onChangeFn() {};

    Wallpaper.prototype.onChange = function onChange(fn) {
//        console.log("Registered wallpaper directive");
        this.onChangeFn = fn;
        this.onChangeFn(this.options);
    };

    Wallpaper.prototype.change = function change(options) {
        this.options = options;
        this.onChangeFn(this.options);
    };

    Wallpaper.prototype.clear = function clear() {
        this.change(false);
    };

    Wallpaper.prototype.update = function clear() {

        var self = this;
        var room = state.resolveOne(assert("Player", "is in"));
        if (room) {
            var defaultWallpaperValue = state.resolveValue(assert("Story", "has", "Wallpaper"));
            var wallpaperValue = state.resolveValue(assert(room, "has", "Wallpaper"));
            var url = yarnScript.resolveRelativeURI(wallpaperValue || defaultWallpaperValue);
            if (url) {
                self.change({
                    image: url,
                    layout: "fullscreen"
                });
            } else {
                self.clear();
            }
        }
    };


    return new Wallpaper();

});





