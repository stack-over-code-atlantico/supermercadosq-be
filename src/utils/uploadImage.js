require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const uploadToS3 = (folder) => {

    const storageTypes = {
        s3: multerS3({
            s3: new aws.S3(),
            bucket: process.env.AWS_BUCKET,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            key: (req, file, cb) => {
                crypto.randomBytes(16, (err, hash) => {
                    if (err) cb(err);
                    const filename = `${folder}/${hash.toString('hex')}-${file.originalname}`;
                    cb(null, filename)
                });
            },
        })
    }
    
    const upload = {
        dest: path.resolve(`/${folder}/`),
        storage: storageTypes["s3"],
        limits: {
            filesize: 2 * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                "image/jpeg",
                "image/pjpeg",
                "image/jpg",
                "image/png"
            ];
    
            if(allowedMimes.includes(file.mimetype)){
                cb(null, true);
            } else {
                cb(new Error("Invalid file type."))
            }
        }
    }

    return upload;
};

module.exports = {uploadToS3};