import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, validate(createUserSchema), createUser);
router.put("/:id", verifyToken, validate(updateUserSchema), updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
