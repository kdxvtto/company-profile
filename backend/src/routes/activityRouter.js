import express from "express";
import { getActivityLogs } from "../controllers/activityLogController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();
/**
 * @swagger
 * /api/activity:
 *   get:
 *     summary: Get Activity Logs
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

// Get recent activity logs (protected)
router.get("/", verifyToken, getActivityLogs);

export default router;
