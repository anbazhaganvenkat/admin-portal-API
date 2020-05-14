require("dotenv").config({ silent: true });

const baseUrl = process.env.BASE_URL || "";

module.exports = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 80,
    defaultApiKey: process.env.DEFAULT_API_KEY,
    corsUrl: process.env.CORS_URL ? process.env.CORS_URL.split(",") : "",
    baseUrl,
    frontendUrl: process.env.FRONTEND_URL,
    defaultTimeZone: process.env.TIMEZONE || "EST",
    aws: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY_ACCESS,
        bucketName: process.env.AWS_BUCKET || "",
    },
};
