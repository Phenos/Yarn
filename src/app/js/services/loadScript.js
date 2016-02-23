angular.module('yarn').factory('loadScript', loadScript);

function loadScript($http) {

    function loadScript (url) {

        var config = {
            method: 'GET',
            url: url + "?random=" + Math.random(),
            cache: false
        };

        function then(response) {
            //console.info("Loaded script: ", response.config.url);
            return {
                source: response.data,
                url: url
            };
        }

        return $http(config).then(then);
    }


    return loadScript;
}
