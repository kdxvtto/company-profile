/**
 * ============================================================================
 * ROUTER: Credit User
 * ============================================================================
 * 
 * ALUR MIDDLEWARE UNTUK POST/PUT:
 * -------------------------------
 * verifyToken → creditUploadFields → injectCreditFiles → validate(zod) → controller
 *     │              │                     │                  │             │
 *     │              │                     │                  │             └─ Simpan ke DB
 *     │              │                     │                  └─ Validasi req.body dengan Zod
 *     │              │                     └─ Parse JSON strings & inject file paths
 *     │              └─ Multer: upload 6 files ke /public/uploads
 *     └─ Cek JWT token valid
 */

import express from "express"; 
import { createCreditUser, getAllCreditUsers, getCreditUserById, updateCreditUser, deleteCreditUser } from "../controllers/creditUser.js";
import { validate } from "../middlewares/validate.js";
import { createCreditUserSchema, updateCreditUserSchema } from "../validations/creditUserValidation.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";
import { injectCreditFiles } from "../middlewares/injectCreditFiles.js";

const router = express.Router();

/**
 * Konfigurasi Multer untuk multiple file uploads
 * Field names ini harus match dengan FormData.append() di frontend
 */
const creditUploadFields = upload.fields([
    { name: 'applicantPhoto', maxCount: 1 },         // Foto pemohon
    { name: 'applicantIdentityPhoto', maxCount: 1 }, // Foto KTP pemohon
    { name: 'familyPhoto', maxCount: 1 },            // Foto keluarga
    { name: 'familyIdentityPhoto', maxCount: 1 },    // Foto KTP keluarga
    { name: 'familyCard', maxCount: 1 },             // Foto Kartu Keluarga
    { name: 'incomePicture', maxCount: 1 },          // Bukti penghasilan
]);

// GET - tidak perlu file upload
router.get("/", verifyToken, getAllCreditUsers);
router.get("/:id", verifyToken, getCreditUserById);

// POST & PUT - perlu file upload + inject files + validasi
router.post("/", verifyToken, creditUploadFields, injectCreditFiles, validate(createCreditUserSchema), createCreditUser);
router.put("/:id", verifyToken, creditUploadFields, injectCreditFiles, validate(updateCreditUserSchema), updateCreditUser);

// DELETE - tidak perlu file upload
router.delete("/:id", verifyToken, deleteCreditUser);

export default router;
