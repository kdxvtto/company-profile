import express from "express";
import  {createService, getAllServices, updateService, deleteService} from "../controllers/serviceController.js";
import { validate } from "../middlewares/validate.js";
import { createServicesSchema, updateServicesSchema } from "../validations/serviceValidation.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", verifyToken, validate(createServicesSchema), createService);
router.put("/:id", verifyToken, validate(updateServicesSchema), updateService);
router.delete("/:id", verifyToken, deleteService);

export default router;
