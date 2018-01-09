var AWS = require('aws-sdk'),
fs = require('fs');

AWS.config.loadFromPath('./config.json');

// Read in the file, convert it to base64, store to S3
fs.readFile('input.docx', function (err, data) {
if (err) { throw err; }

var base64data = new Buffer(data, 'binary');

var params = {
  Bucket: proccess.env.S3_BUCKET,
  Key: 'input.docx',
  Body: base64data
};

var s3 = new AWS.S3();
s3.putObject(params, (err, data) => {
  if (err) {
    console.log(err);      
  } else {
    console.log("Succesfully uploaded data to bucket")
  }
});


});