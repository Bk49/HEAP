import { Buffer as buffer } from "buffer";
// Load the AWS SDK for Node.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const {
    REACT_APP_AWS_ACCESS_KEY_ID,
    REACT_APP_AWS_SECRET_ACCESS_KEY,
    REACT_APP_BUCKET_REGION,
    REACT_APP_BUCKET_NAME,
} = process.env;
// Set the region
const S3 = new S3Client({
    region: REACT_APP_BUCKET_REGION,
    credentials: {
        accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
});

// Set the credentials
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
// AWS.config.credentials(credentials);

// Create an S3 client
// const s3 = new AWS.S3();

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

    const fileLocation = `${url}.${mime[1].substring(6)}`;
    const { $metadata } = await S3.send(
        new PutObjectCommand({
            Bucket: REACT_APP_BUCKET_NAME,
            Key: fileLocation,
            Body: buf,
        })
    );

    return $metadata.httpStatusCode === 200
        ? `https://${REACT_APP_BUCKET_NAME}.s3.${REACT_APP_BUCKET_REGION}.amazonaws.com/${fileLocation}`
        : "";
};

const handleImageUpload = async (image, url) => {
    try {
        if (image instanceof File) {
            const base64Url = await fileToBase64(image);
            return await uploadImage(base64Url, url);
        } else {
            return image;
        }
    } catch (e) {
        console.log(e);
    }
};

export default handleImageUpload;
