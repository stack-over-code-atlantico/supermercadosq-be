const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

function removerImg(image) {
    if (!image) {
        return;
    }
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: image,
        }).promise();
    } else {
        return promisify(fs.unlink)(
            path.resolve(image)
        )
    }
  };

module.exports = removerImg;