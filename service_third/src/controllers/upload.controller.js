const AWS = require("aws-sdk");
const BUCKET_NAME = "mybuckettungthanh";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

module.exports.uploadFile = async (req, res) => {
  const files = req.files;
  const avatar = await files.avatar;

  const params = {
    Bucket: BUCKET_NAME,
    Key: avatar.name,
    Body: avatar.data,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading file to S333");
    }
    res.send("File uploaded to S3");
  });
};

module.exports.downloadFile = async (req, res) => {
  const filename = req.params.filename;

  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error downloading file from S3");
    }

    res.setHeader("Content-Type", data.ContentType);
    res.send(data.Body);
  });
};
