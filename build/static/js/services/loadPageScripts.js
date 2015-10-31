angular.module('mindgame').factory('loadPageScripts', loadPageScripts);

function loadPageScripts($document,
                         $http,
                         $q) {

    function loadScripts(scriptType, onLoad) {
        var promise;

        promise = $q(function (success) {
            success();
        });

        angular.forEach($document.find("script"), function (scriptTag) {
            if (scriptTag.type.toLowerCase() === "bigmess") {
                promise = promise.then(function () {
                    return loadScript(scriptTag.src, onLoad);
                });
            }
        });

        return promise;
    }

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

    return loadScripts;
}
