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
// Memory-First Strategy: Default to memory storage (Cloudinary) to avoid EROFS errors on Vercel.
// Use disk storage ONLY if explicitly in local development and not on Vercel.
const useDiskStorage = process.env.NODE_ENV === "development" && !process.env.VERCEL;

export const upload = multer({
    storage: useDiskStorage ? diskStorage : memoryStorage,
});