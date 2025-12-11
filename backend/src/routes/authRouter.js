import express from "express";
// Wrong before: controller diekspor default tapi diimport sebagai named, membuat handler undefined.
import { login, register } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
