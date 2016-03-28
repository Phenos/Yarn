var s3 = require('s3');
var Twit = require('twit');

exports.status = {
    name: 'twitterProfile',
    description: "Returns the twitter profile of a member",
    //todo: re-enable auth here at some point
    //middleware: ['authentication'],
    outputExample: [{}],
    run: twitterProfile
};

function twitterProfile(api, data, next) {
    console.log("0");
    //var username = data.user && data.user.username;
    var profile = data.params.twitterProfile;

    console.log("2",api.config.twitter);

    var T = new Twit({
        consumer_key: api.config.twitter.consumer_key,
        consumer_secret: api.config.twitter.consumer_secret,
        access_token: api.config.twitter.access_token,
        access_token_secret: api.config.twitter.access_token_secret,
        timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
    });

    if (profile) {
        T.get('users/show', { screen_name: profile },  function (err, returnData, response) {
            data.response.twitterProfile = returnData;
            if (err) {
                next(new Error(err));
            } else {
                next();
            }
        });

    } else {
        console.log("5");
        next(new Error("You must provide a username!"));
    }

}
