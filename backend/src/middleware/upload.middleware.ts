import multer from "multer";

// Store files in memory buffer before sending to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },// 5 MB limit
    fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
        const allowed = ["image/jpeg", "image/png", "image/webp"];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
        }
    },
});
export default upload;