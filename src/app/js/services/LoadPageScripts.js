angular.module('mindgame').factory('loadPageScripts', loadPageScripts);

function loadPageScripts(loadScript,
                         $document,
                         $q) {

    function loadScripts(scriptType) {
        var deferred = $q.defer();
        var rootPromise = deferred.promise;
        var promise = rootPromise;

        /**
         * Queue all scripts on the page to load sequencially
         */
        angular.forEach($document.find("script"), onEachScript);
        function onEachScript(scriptTag) {
            if (scriptTag.type.toLowerCase() === scriptType) {
                promise = queueScriptLoad(scriptTag.src, promise);
            }
        }
        function queueScriptLoad(src, promise) {
            console.log("Queueuing script", src);
            return loadScript(src).then(function (source) {
                deferred.notify(source);
                return promise;
            });
        }

        return rootPromise;
    }

    return loadScripts;
}
