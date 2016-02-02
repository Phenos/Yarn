var loopback = require("loopback");
var s3 = require('s3');

module.exports = function (Story) {

    Story.potato = function (options, callback) {
        var ctx = loopback.getCurrentContext();
        var currentUser = ctx.get('currentUser');
        console.log("currentUser", currentUser);

        var s3client = s3.createClient({
            s3Options: {
                accessKeyId: 'AKIAIODEGQD5KBXPZQCA',
                secretAccessKey: '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',
                region: "us-west-2"
                //endpoint: "storage.yarnstudio.io"
            }
        });
        var s3Params = {
            Key: "test/3rocks.yarn.txt",
            Bucket: "storage.yarnstudio.io"
        };
        console.log("Streaming from S3");
        var stream = s3client.downloadStream(s3Params);
        var data = "";
        console.log("1");
        stream.on('error', function(err) {
            console.error("unable to download:", err.stack);
            callback(err);
        });
        console.log("2");
        stream.on('data', function(chunck) {
            console.log("A");
            data = data + chunck;
        });
        console.log("3");
        stream.on('end', function() {
            callback(null, {
                potato: true,
                options: options,
                story: data
            });
        });
        console.log("B");


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
            http: {verb: 'post'}
        }
    );

};
