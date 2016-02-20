angular.module('yarn').factory('loadMetadata', loadMetadata);

function loadMetadata($http) {

    function loadMetadata () {
        //console.log(scriptTag);
        var config = {
            method: 'GET',
            url: './metadata.json'
        };

        function then(response) {
            //console.info("Loaded metadata from : ", response.config.url, response.data);
            return response.data;
        }

        return $http(config).then(then);
    }

    return loadMetadata;
}
