yarn.service("twitterProfile", function (apiClient, session, yConsole) {

    function twitterProfile(username, success, failed) {
        var user = session.user();
        if (user) {
            //console.log("twitterProfile > username", username);
            var profile = username.split(".")[1];
            return apiClient.action('twitterProfile', {
                token: user.token,
                username: user.username,
                twitterProfile: profile
            }, function (data) {
                //console.log("twitterProfile > data", data);
                if (!data.error) {
                    success && success(data.twitterProfile);
                } else {
                    yConsole.error("An error occurered while fetching the twitter profile : " + data.error);
                    failed && failed(data.error);
                }
                // do stuff
            });
        } else {
            failed && failed("No authentifier player, unable to fetch twitter profile.");
        }
    }

    return twitterProfile;
});