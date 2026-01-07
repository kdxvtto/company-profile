import express from "express";
import { search } from "../controllers/searchController.js";

const router = express.Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

// GET /api/search?q=keyword
router.get("/", search);

export default router;
