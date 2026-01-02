import express from "express";
import { createGallerySchema, updateGallerySchema } from "../validations/galleryValidation.js";
import { createGallery, deleteGallery, getGallery, updateGallery } from "../controllers/galleryController.js";
import { validate } from "../middlewares/validate.js";
import { uploadGallery } from "../config/cloudinary.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, uploadGallery.single("image"), validate(createGallerySchema), createGallery);
router.get("/", getGallery);
router.put("/:id", verifyToken, uploadGallery.single("image"), validate(updateGallerySchema), updateGallery);
router.delete("/:id", verifyToken, deleteGallery);

export default router;  