var s3 = require('s3');

exports.status = {
    name: 'files',
    description: "Returns the list of available files in the user' storage",

    outputExample: {},

    //run: function (api, data, next) {
    //    data.response.id                = api.id;
    //    data.response.actionheroVersion = api.actionheroVersion;
    //    data.response.uptime            = new Date().getTime() - api.bootTime;
    //
    //    files
    //    next();
    //}
    run: files
};

//function files(callback) {
function files(api, data, next) {
    var username = data.user && data.user.username;
    var allFiles = [];

    if (username) {

        // Create a client connection to S3
        var s3client = s3.createClient({
            s3Options: api.config.s3.connectionOptions
        });

        var storyPath = username + "/";
        var params = {
            s3Params: {
                Prefix: storyPath,
                Bucket: "storage.yarnstudio.io"
            },
            recursive: true
        };

        api.log("Get the list of objects from : " + storyPath);
        var stream = s3client.listObjects(params);
        stream.on('error', function (err) {
            api.error("unable to download:", err.stack);
            next(new Error(err));
        });
        stream.on('data', function (files) {
            allFiles = allFiles.concat(files.Contents);
        });
        stream.on('end', function () {
            data.response.files = allFiles;
            next();
        });
    } else {
        next(new Error("No user currently logged in!"));
    }

};

