import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "..", "..", "public", "uploads");

export const removeFile = async(relativePath) => {
    if(!relativePath) return
    const filePath = path.join(uploadsDir, path.basename(relativePath));
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.log(error);
    }
}
