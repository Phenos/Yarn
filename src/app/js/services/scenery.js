yarn.factory('wallpaperService', wallpaperService);

function wallpaperService() {

    var image = "";
    var onChangeFn = function () {};

    function onChange(fn) {
        //console.log("Registered wallpaper directive");
        onChangeFn = fn;
        onChangeFn(image);
    }

    function change(_image) {
        //console.log("Changing wallpaper to : ", _image);
        image = _image;
        onChangeFn(image);
    }
    function clear() {
        change("");
    }

    return {
        clear: clear,
        change: change,
        onChange: onChange
    };

}



