import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get All Users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get User by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update User by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete User by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, validate(createUserSchema), createUser);
router.put("/:id", verifyToken, validate(updateUserSchema), updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
