angular.module('yarn').factory('sceneryService', sceneryService);

function sceneryService() {

    var image = "";
    var onChangeFn = function () {};

    // todo: allo more flexible event hooks with a true "bind" syntax
    function onChange(fn) {
        //console.log("Registered scenery directive");
        onChangeFn = fn;
        onChangeFn(image);
    }

    function change(_image) {
        //console.log("Changing scenery to : ", _image);
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



