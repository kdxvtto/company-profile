import express from "express";  
import { createNews, getAllNews, getNewsById, updateNews, deleteNews } from "../controllers/newsController.js";
import { validate } from "../middlewares/validate.js";
import { createNewsSchema, updateNewsSchema } from "../validations/newsValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadNews } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", verifyToken, uploadNews.single("image"), validate(createNewsSchema), createNews);
router.put("/:id", verifyToken, uploadNews.single("image"), validate(updateNewsSchema), updateNews);
router.delete("/:id", verifyToken, deleteNews);

export default router;