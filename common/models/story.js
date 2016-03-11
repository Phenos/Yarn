var loopback = require("loopback");
var fs = require('fs');
var s3 = require('s3');

module.exports = function (Story) {

    Story.potato = function (options, callback) {
        var ctx = loopback.getCurrentContext();
        var currentUser = ctx.get('currentUser');
        //console.log("currentUser", currentUser);

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
        //console.log("Streaming from S3 : " + storyPath);
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
            //console.log("Story loaded from S3");
            callback(null, {
                options: options,
                story: data
            });
        });


    };

    Story.files = function (options, callback) {
        var allFiles = [];

        // Get the current user
        var ctx = loopback.getCurrentContext();
        var currentUser = ctx.get('currentUser');
        console.log("currentUser", currentUser);

        // Create a client connection to S3
        var s3client = s3.createClient({
            s3Options: {
                accessKeyId: process.env.S3_accessKeyId,
                secretAccessKey: process.env.S3_secretAccessKey,
                region: process.env.S3_region
            }
        });

        var username = currentUser.username;
        var storyPath = username + "/";
        var params = {
            s3Params: {
                Prefix: storyPath,
                Bucket: "storage.yarnstudio.io"
            },
            recursive: true
        };

        console.log("Get the list of objects from : " + storyPath);
        var stream = s3client.listObjects(params);
        stream.on('error', function(err) {
            console.error("unable to download:", err.stack);
            callback(err);
        });
        stream.on('data', function(files) {
            allFiles = allFiles.concat(files.Contents);
        });
        stream.on('end', function() {
            callback(null, {
                options: options,
                files: allFiles
            });
        });

    };

    Story.saveFile = function (options, completeCallback) {
        var allFiles = [];

        // Get the current user
        var ctx = loopback.getCurrentContext();
        var currentUser = ctx.get('currentUser');
        console.log("currentUser", currentUser);

        // Create a client connection to S3
        var s3client = s3.createClient({
            s3Options: {
                accessKeyId: process.env.S3_accessKeyId,
                secretAccessKey: process.env.S3_secretAccessKey,
                region: process.env.S3_region
            }
        });

        var username = currentUser.username;
        var timestamp = (new Date()).toJSON().replace(".", ":");
        var randomId = parseInt((Math.random()*100000000000)).toString();
        var fullPath = [
            "/tmp/YARN-TEMP-",
            username,
            timestamp,
            randomId,
            options.filename
        ].join("-");

        var fullURI = [
            username,
            "/",
            options.uri
        ].join("");

        var file = {
            fullURI : fullURI,
            uri : options.uri,
            path : fullPath,
            content: options.content
        };
        console.log("fullURI: ", fullURI);
        console.log("fullPath: ", fullPath);

        // Write the file to a temp file
        function saveFile(callback) {
            fs.writeFile(file.path, file.content, function(err) {
                if (!err) {
                    console.log("The file was saved!");
                    callback();
                } else {
                    console.error(err);
                }
            });
        }

        function uploadFile(callback) {
            var params = {
                s3Params: {
                    Key: file.fullURI,
                    Bucket: "storage.yarnstudio.io"
                },
                localFile: file.path
            };

            console.log("Get the list of objects from : " + file.fullURI);
            var uploader = s3client.uploadFile(params);
            uploader.on('error', function(err) {
                console.error("unable to upload to S3:", err.stack);
                callback(err);
            });
            uploader.on('end', function() {
                console.log("Upload complete for : " + file.fullURI);
                callback();
            });
        }

        function deleteFile(callback) {
            fs.unlink(file.path, callback);
        }

        saveFile(function (err) {
            if (err) {
                completeCallback(err);
            } else {
                uploadFile(function (err) {
                    if (err) {
                        completeCallback(err);
                    } else {
                        deleteFile(function (err, meta) {
                            if (err) {
                                completeCallback(err);
                            } else {
                                console.log("File saved and temp file deleted");
                                completeCallback(null, { meta: meta });
                            }
                        })
                    }
                })
            }
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


    Story.remoteMethod(
        'files',
        {
            description: 'Get the list of files in storage for the current story.',
            accepts: [
                {
                    arg: 'credentials',
                    type: 'object',
                    required: true,
                    http: {source: 'body'},
                    description: 'Credentials?'
                }
            ],
            returns: {
                arg: 'files',
                type: 'object',
                root: true,
                description: 'The list of files in storage'
            },
            http: {verb: 'get'}
        }
    );

    Story.remoteMethod(
        'saveFile',
        {
            description: 'Save a file to S3 storage.',
            accepts: [
                {
                    arg: 'credentials',
                    type: 'object',
                    required: true,
                    http: {source: 'body'},
                    description: 'Credentials?'
                }
            ],
            returns: {
                arg: 'file',
                type: 'object',
                root: true,
                description: 'The meta for the file that was saved'
            },
            http: {verb: 'post'}
        }
    );

};
