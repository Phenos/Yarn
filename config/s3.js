
exports.default = {
  s3: function(api){
    return {
      connectionOptions: {
        accessKeyId: process.env.S3_accessKeyId,
        secretAccessKey: process.env.S3_secretAccessKey,
        region: process.env.S3_region
      }
    }
  }
};

exports.test = {
  logger: function(api){
    return {
      transports: null
    };
  }
};
