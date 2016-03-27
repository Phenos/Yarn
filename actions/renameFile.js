var s3 = require('s3');

exports.status = {
    name: 'renameFile',
    description: "Rename a file from the S3 storage",
    middleware: ['authentication'],
    outputExample: {},
    run: renameFile
};

function renameFile(api, data, next) {
    var username = data.user && data.user.username;

    if (username) {
        // Create a client connection to S3
        var s3client = s3.createClient({
            s3Options: api.config.s3.connectionOptions
        });

        var bucket = "storage.yarnstudio.io";

        var fullURI_source = [
            bucket,
            "/",
            username,
            "/",
            data.params.uri_source
        ].join("");

        var fullURI_destination = [
            username,
            "/",
            data.params.uri_destination
        ].join("");

        var params = {
            Key: fullURI_destination,
            CopySource: fullURI_source,
            Bucket: bucket
        };

        api.log("fullURI_destination : " + fullURI_destination);
        api.log("fullURI_source : " + fullURI_source);
        //api.log("Save file to: : " + file.fullURI);
        var uploader = s3client.moveObject(params);
        uploader.on('error', function (err) {
            api.log("ERROR: unable to rename file from S3:");
            api.log(err.stack);
            next(new Error(err));
        });
        uploader.on('end', function (meta) {
            //api.log("Upload complete for : " + file.fullURI);
            data.response.meta = meta;
            next();
        });


    } else {
        next(new Error("No user currently logged in!"));
    }
}

