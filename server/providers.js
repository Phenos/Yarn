module.exports = {
  "twitter": {
    "provider": "twitter",
    "authScheme": "oauth",
    "module": "passport-twitter",
    "callbackURL": "/auth/twitter/callback",
    "authPath": "/auth/twitter",
    "callbackPath": "/auth/twitter/callback",
    "successRedirect": "/",
    "failureRedirect": "/login",
    "consumerKey": process.env.TWITTER_consumerKey,
    "consumerSecret": process.env.TWITTER_consumerSecret,
    "failureFlash": true
  }
};
