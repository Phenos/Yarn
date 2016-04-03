yarn.service('wallpaper', function wallpaper() {

    function Wallpaper() {
        this.options = "";
    }

    Wallpaper.prototype.onChangeFn = function onChangeFn() {};

    Wallpaper.prototype.onChange = function onChange(fn) {
        //console.log("Registered wallpaper directive");
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

    return new Wallpaper();

});





