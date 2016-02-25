var loopback = require("loopback");
var s3 = require('s3');

module.exports = function (Story) {

    Story.potato = function (options, callback) {
        var ctx = loopback.getCurrentContext();
        var currentUser = ctx.get('currentUser');
        console.log("currentUser", currentUser);

        var s3client = s3.createClient({
            s3Options: {
                accessKeyId: process.env.S3_accessKeyId,
                secretAccessKey: process.env.S3_secretAccessKey,
                region: process.env.S3_region
            }
        });
        var username = currentUser.username;
        var storyPath = username + "/story.yarn.txt";
        var s3Params = {
            Key: storyPath,
            Bucket: "storage.yarnstudio.io"
        };
        console.log("Streaming from S3 : " + storyPath);
        var stream = s3client.downloadStream(s3Params);
        var data = "";
        stream.on('error', function(err) {
            console.error("unable to download:", err.stack);
            callback(err);
        });
        stream.on('data', function(chunck) {
            data = data + chunck;
        });
        stream.on('end', function() {
            console.log("Story loaded from S3");
            callback(null, {
                options: options,
                story: data
            });
        });


    };

    Story.remoteMethod(
        'potato',
        {
            description: 'A potato method.',
            accepts: [
                {
                    arg: 'credentials',
                    type: 'object',
                    required: true,
                    http: {source: 'body'},
                    description: 'Call potato with options... gnah!'
                }
            ],
            returns: {
                arg: 'options', type: 'object', root: true,
                description: 'A potatoe object with options!'
            },
            http: {verb: 'get'}
        }
    );

};
