yarn.service('yarn', function ($localStorage,
                               postal,
                               state,
                               script,
                               yConsole,
                               consoleHelper,
                               gamePedicates) {

    function Yarn() {

        this.scripts = [];

        /**
         * Parse a text into various semantic parts to be consumed by Yarn
         * @param text
         * @param url
         */
        this.load = function (text, url) {
            return script.load(text, url).then(function () {
                //console.log("wtf", script);
                return script;
            });
        };

    }

    gamePedicates();

    var yarn = new Yarn();


    return yarn;
});
