const multer = require("multer");
const MIME_TYPES = {
    "image/svg+xml": "svg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};

const uploadMulter = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, callback) => {
        const isValid = !!MIME_TYPES[file.mimetype];
        const error = isValid ? null : new Error("Invalid mime type");
        callback(error, isValid);
    },
}).single("image");

module.exports = uploadMulter;