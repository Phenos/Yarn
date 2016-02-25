yarn.factory('loadPageScripts', loadPageScripts);

function loadPageScripts(loadScript,
                         $document,
                         $q) {

    function loadPageScripts(scriptType) {
        //var promise = $q(function () {
        //    console.log("starting chain!");
        //});
        var deferred = $q.defer();
        var scripts = [];

        /**
         * Queue all scripts on the page to load sequencially
         */
        var promises = [];
        var scriptTags = $document.find("script");
        angular.forEach(scriptTags, function (scriptTag) {
            if (scriptTag.type.toLowerCase() === scriptType) {
                console.log("queued script ", scriptTag.src);
                promises.push(loadScript(scriptTag.src));
            }
        });

        $q.all(promises).then(function (scripts) {
            console.log("scripts", scripts);
            deferred.resolve(scripts);
        });

        return deferred.promise;
    }

    return loadPageScripts;
}
