import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads/"));
    },
    filename: (req, file, cb) => {
       const extName = path.extname(file.originalname);
       cb(null, `${Date.now()}${extName}` );
    },
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" || 
        file.mimetype === "image/png" || 
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

export default upload;