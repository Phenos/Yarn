angular.module('mindgame').factory('loadScript', loadScript);

function loadScript($http) {

    function loadScript (src, onLoad) {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: src
        };
        function then(response) {
            console.info("Loaded script ", response.config.url);
            onLoad(response.data);
        }
        return $http(config)
            .then(then);
    }

    return loadScript;
}
