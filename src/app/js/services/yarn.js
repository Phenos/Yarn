yarn.service('yarn', function (yarnScript) {

    function Yarn() {

        this.scripts = [];

        /**
         * Parse a text into various semantic parts to be consumed by Yarn
         * @param {string} text The source code text to be parsed
         * @param {string} url The reference url from where the text was loaded
         * @returns {undefined}
         */
        this.load = function (text, url) {
            return yarnScript.load(text, url).then(function () {
                return yarnScript;
            });
        };
    }

    return new Yarn();
});
