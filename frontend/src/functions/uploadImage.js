import { Buffer as buffer } from "buffer";

// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "ap-southeast-1" });

// Set the credentials
AWS.config.update({
    accessKeyId: "AKIA2VI2VRVWY5QHR62D",
    secretAccessKey: "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",
});

// Create an S3 client
const s3 = new AWS.S3();

const uploadImage = async (images) => {
    for (let { imageUrl, base64 } of images) {
        if (/^https?:\/\//.test(imageUrl)) continue;
        const buf = new buffer.from(
            base64.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        console.log("buffer: " + buf);
        const mime = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        console.log("MIME in upload.js: " + mime);
        await s3
            .upload({
                Bucket: "heap-g26-image-bucket",
                Key: `${imageUrl}`,
                ContentEncoding: "base64",
                Body: buf,
                ContentType: mime[1],
            })
            .promise();
    }
    return;
};

export default uploadImage;