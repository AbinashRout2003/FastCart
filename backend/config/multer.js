import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");   //  add slash
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // better naming
  },
});

export const upload = multer({ storage });