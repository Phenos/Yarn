yarn.service('wallpaper', function wallpaper() {

    function Wallpaper() {
        this.image = "";
    }

    Wallpaper.prototype.onChangeFn = function onChangeFn() {};

    Wallpaper.prototype.onChange = function onChange(fn) {
        //console.log("Registered wallpaper directive");
        this.onChangeFn = fn;
        this.onChangeFn(this.image);
    };

    Wallpaper.prototype.change = function change(_image) {
        //console.log("Changing wallpaper to : ", _image);
        this.image = _image;
        this.onChangeFn(this.image);
    };

    Wallpaper.prototype.clear = function clear() {
        this.change("");
    };

    return new Wallpaper();

});





