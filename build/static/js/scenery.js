angular.module('mindgame').factory('sceneryService', sceneryService);

function sceneryService() {
    console.log("screnery service loader!");

    var image = "";
    var onChangeFn = function () {};

    // todo: allo more flexible event hooks with a true "bind" syntax
    function onChange(fn) {
        onChangeFn = fn;
    }

    function change(_image) {
        console.log("scenery change: ", _image);
        image = _image;
        onChangeFn(image);
    }

    return {
        change: change,
        onChange: onChange
    };

}



