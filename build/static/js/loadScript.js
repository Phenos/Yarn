angular.module('mindgame').factory('loadScript', loadScript);

function loadScript($http) {

    function loadScript (src) {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: src
        };

        function then(response) {
            console.info("Loaded script: ", response.config.url);
            return {
                source: response.data,
                url: src
            };
        }

        return $http(config).then(then);
    }


    return loadScript;
}
