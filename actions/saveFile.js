var fs = require('fs');
var s3 = require('s3');

exports.status = {
    name: 'saveFile',
    description: "Save a file back into the users S3 storage",
    middleware: ['authentication'],
    outputExample: {},
    run: saveFile
};

function saveFile(api, data, next) {

    if (data.user) {
        // Create a client connection to S3
        var s3client = s3.createClient({
            s3Options: api.config.s3.connectionOptions
        });

        var username = data.user.username;
        var timestamp = (new Date()).toJSON().replace(".", ":");
        var randomId = parseInt((Math.random() * 100000000000)).toString();
        var fullPath = [
            "/tmp/YARN-TEMP-",
            username,
            timestamp,
            randomId,
            data.filename
        ].join("-");

        var fullURI = [
            username,
            "/",
            data.uri
        ].join("");

        var file = {
            fullURI: fullURI,
            uri: data.uri,
            path: fullPath,
            content: data.content
        };
        api.log("fullURI: ", fullURI);
        api.log("fullPath: ", fullPath);

        // Write the file to a temp file
        function saveFile(callback) {
            fs.writeFile(file.path, file.content, function (err) {
                if (!err) {
                    api.log("The file was saved!");
                    callback();
                } else {
                    api.error(err);
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

            api.log("Get the list of objects from : " + file.fullURI);
            var uploader = s3client.uploadFile(params);
            uploader.on('error', function (err) {
                api.error("unable to upload to S3:", err.stack);
                next(new Error(err));
            });
            uploader.on('end', function () {
                api.log("Upload complete for : " + file.fullURI);
                callback();
            });
        }

        function deleteFile(callback) {
            fs.unlink(file.path, callback);
        }

        saveFile(function (err) {
            if (err) {
                next(new Error(err));
            } else {
                uploadFile(function (err) {
                    if (err) {
                        next(new Error(err));
                    } else {
                        deleteFile(function (err, meta) {
                            if (err) {
                                next(new Error(err));
                            } else {
                                api.log("File saved and temp file deleted");
                                data.response.meta = meta;
                                next();
                            }
                        })
                    }
                })
            }
        });

    } else {
        next(new Error("No user currently logged in!"));
    }
}

