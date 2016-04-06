yarn.service("twitterProfile", function (apiClient) {

    function twitterProfile(username, success, failed) {
            var profile = username.split(".")[1];
            return apiClient.action('twitterProfile', {
                twitterProfile: profile
            }, function (data) {
                if (!data.error) {
                    success && success(data.twitterProfile);
                } else {
                    console.error("An error occurered while fetching" +
                        " the twitter profile : " + data.error);
                    failed && failed(data.error);
                }
            });
    }

    return twitterProfile;
});