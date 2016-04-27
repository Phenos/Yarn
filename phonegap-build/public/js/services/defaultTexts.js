yarn.service("defaultTexts", function () {

    var fallbacks = {
        "you-dont-know-where-you-are": "You dont know where you are!",
        "nothing-happened": "Nothing happened!"
    };

    function DefaultTexts () {

    }

    DefaultTexts.prototype.get = function (key) {
        var fallback = fallbacks[key];
        if (!fallback) {
            fallback = key;
        }
        return fallback;
    };

    return new DefaultTexts();

});