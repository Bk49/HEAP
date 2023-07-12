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

const fileToBase64 = async (file) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            res(reader.result);
        };

        reader.onerror = (err) => {
            rej(err);
        };

        reader.readAsDataURL(file);
    });
};

const uploadImage = async (image, url) => {
    const buf = new buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
    );
    const mime = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    return await s3
        .upload({
            Bucket: "heap-g26-image-bucket",
            Key: `${url}.${mime[1].substring(6)}`,
            ContentEncoding: "base64",
            Body: buf,
            ContentType: mime[1],
        })
        .promise();
};

const handleImageUpload = async (image, url) => {
    try {
        if (image instanceof File) {
            const base64Url = await fileToBase64(image);
            return await uploadImage(base64Url, url);
        } else {
            return { Location: image };
        }
    } catch (e) {
        console.log(e);
    }
};

export default handleImageUpload;
