var AWS = require('aws-sdk'),
  fs = require('fs');

 // The AWS config vars must be set up to use this module. 
 // They are saved in environment variables as follows:
 // AWS_ACCESS_KEY_ID=<value> 
 // AWS_SECRET_ACCESS_KEY=<value>

const upload = (params, data) => {
  const s3 = new AWS.S3();
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err);
      throw(err);
    } else {
      console.log("Succesfully uploaded data to bucket")
    }
  });
}

module.exports = {
  uploadFromFile: (fileName) => {
    // Read in the file, convert it to base64, store to S3
    fs.readFile(fileName, function (err, data) {
      if (err) { throw err; }

      var base64data = new Buffer(data, 'binary');

      var params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: base64data
      };

      upload(params, data);

    });
  },

  uploadFromBuffer: (data, fileName) => {
    var params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: data
    };
    upload(params, data);
  }
}
