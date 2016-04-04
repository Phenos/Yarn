yarn.service("channel", function ($window) {

    var postal = $window["postal"];
    return postal.channel("yarn");

});