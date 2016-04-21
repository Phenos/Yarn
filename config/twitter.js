exports.default = {
    twitter: function (api) {
        return {
            consumer_key: process.env.TWITTER_consumerKey,
            consumer_secret: process.env.TWITTER_consumerSecret,
            access_token: process.env.TWITTER_accessToken,
            access_token_secret: process.env.TWITTER_accessTokenSecret
        }
    }
};