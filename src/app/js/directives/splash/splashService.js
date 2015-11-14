angular.module('mindgame').factory('splashService', splashService);

function splashService() {
    var splashController;
    var hidden = false;
    console.log("Splash service loaded");

    function hide() {
        hidden = true;
        if (splashController)
            splashController.hide();
    }

    function register(ctrl) {
        splashController = ctrl;
        console.log('splashController', splashController);
        if (hidden) splashController.hide();
    }

    return {
        register: register,
        hide: hide
    }
}