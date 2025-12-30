import express from "express";
import  {createService, getAllServices, getServiceById, updateService, deleteService} from "../controllers/serviceController.js";
import { validate } from "../middlewares/validate.js";
import { createServicesSchema, updateServicesSchema } from "../validations/serviceValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadService } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", verifyToken, uploadService.single("image"), validate(createServicesSchema), createService);
router.put("/:id", verifyToken, uploadService.single("image"), validate(updateServicesSchema), updateService);
router.delete("/:id", verifyToken, deleteService);

export default router;
