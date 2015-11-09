angular.module('mindgame').factory('loadPageScripts', loadPageScripts);

function loadPageScripts(loadScript,
                         $document,
                         $q) {

    function loadScripts(scriptType, onLoad) {
        var promise;

        promise = $q(function (success) {
            success();
        });

        angular.forEach($document.find("script"), function (scriptTag) {
            if (scriptTag.type.toLowerCase() === scriptType) {
                promise = promise.then(function () {
                    return loadScript(scriptTag.src, onLoad);
                });
            }
        });

        return promise;
    }

    return loadScripts;
}
