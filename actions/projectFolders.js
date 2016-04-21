var s3 = require('s3');

exports.status = {
    name: 'projectFolders',
    description: "Returns the list of available project folders in the user' storage",
    middleware: ['authentication'],
    outputExample: [{
            Key: 'twitter.YarnStudioGames/folder',
            LastModified: "Thu Mar 10 2016 14:03:28 GMT-0500 (EST)",
            ETag: '"239dee9f8c7bdf7beec35c573f40ca86"',
            Size: 0,
            StorageClass: 'STANDARD',
            Owner: {}
        }],
    run: projectFolders
};

function projectFolders(api, data, next) {
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

        //api.log("Get the list of objects from : " + storyPath);
        var stream = s3client.listObjects(params);
        stream.on('error', function (err) {
            api.log("ERROR: unable to download:", err.stack);
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

