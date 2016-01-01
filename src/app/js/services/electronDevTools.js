angular.module('mindgame').factory('electronDevTools', electronDevTools);


function electronDevTools($localStorage) {

    if (require) {
        var remote = require('remote');
    }

    function electronDevTools () {

        if (!$localStorage.electronDevTools) {
            $localStorage.electronDevTools = {
                isOpen: false
            }
        }

        this.open = function () {
            var a = remote.getCurrentWindow().openDevTools();
            $localStorage.electronDevTools.isOpen = true;
        };

        this.remember = function (url) {
            var self = this;
            if ($localStorage.electronDevTools.isOpen) {
                self.open();
            }
        };

        this.close = function () {
            $localStorage.electronDevTools.isOpen = false;
        };

        this.get = function () {
            return $localStorage.electronDevTools.isOpen;
        };

        this.toggle = function () {
            if ($localStorage.electronDevTools.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

    }


    return new electronDevTools();
}
