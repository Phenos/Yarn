yarn.service('metadata', function ($http) {

    function metadata () {
        //console.log(scriptTag);

        return $http({
            method: 'GET',
            url: './metadata.json'
        }).then(function (response) {
            //console.info("Loaded metadata from : ", response.config.url, response.data);
            return response.data;
        });
    }

    return metadata();
});
