import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Disk Storage for Local Development
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Relative to backend/root
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// 2. Memory Storage for Cloudinary
const memoryStorage = multer.memoryStorage();

// 3. Export based on environment
export const upload = multer({
    storage: process.env.NODE_ENV === "production" ? memoryStorage : diskStorage,
});