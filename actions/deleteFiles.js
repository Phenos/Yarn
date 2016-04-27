var s3 = require('s3');

exports.status = {
    name: 'deleteFiles',
    description: "Delete files from the S3 storage",
    middleware: ['authentication'],
    outputExample: {},
    run: deleteFiles
};

function deleteFiles(api, data, next) {
    var username = data.user && data.user.username;

    if (username) {
        // Create a client connection to S3
        var s3client = s3.createClient({
            s3Options: api.config.s3.connectionOptions
        });

        var bucket = "storage.yarnstudio.io";

        function prefix(key) {
            return [
                bucket,
                "/",
                username,
                "/",
                key
            ].join("");
        }

        var files = data.params.files;
        var keysToDelete = [];
        if (files) {

            files.forEach(function (file) {
                keysToDelete.push({
                    //Key: prefix(file.Key)
                    Key: file.Key
                });
            });

            api.log("keysToDelete", "debug", keysToDelete);

            var params = {
                Bucket: bucket,
                Delete: {
                    Objects: keysToDelete
                }
            };

            //api.log("Save file to: : " + file.fullURI);
            var uploader = s3client.deleteObjects(params);
            uploader.on('error', function (err) {
                api.log("Unable to delete files from S3:", "error");
                api.log(err.stack);
                next(new Error(err));
            });
            uploader.on('end', function (meta) {
                api.log("Delete complete");
                api.log("Meta", "info", meta);
                data.response.meta = meta;
                next();
            });
        } else {
            next(new Error("No files provided!"));
        }

    } else {
        next(new Error("No user currently logged in!"));
    }
}

