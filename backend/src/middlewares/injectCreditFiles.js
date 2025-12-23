/**
 * ============================================================================
 * MIDDLEWARE: injectCreditFiles
 * ============================================================================
 * 
 * ALUR REQUEST CREDIT USER:
 * -------------------------
 * 1. Frontend kirim FormData dengan files + nested JSON objects
 * 2. Multer middleware (creditUploadFields) → simpan files, populate req.files
 * 3. >>> MIDDLEWARE INI <<< → parse JSON strings & inject file paths ke req.body
 * 4. Zod validation → validasi req.body yang sudah lengkap
 * 5. Controller → simpan ke database
 * 
 * MENGAPA PERLU MIDDLEWARE INI?
 * -----------------------------
 * - Saat kirim multipart/form-data, nested objects dikirim sebagai JSON STRING
 *   Contoh: req.body.applicant = '{"name":"John","email":"john@mail.com"}'
 * 
 * - Multer hanya handle files, tidak parse nested objects
 * 
 * - Zod expect req.body.applicant sebagai OBJECT, bukan string
 *   Jadi perlu di-parse dulu: JSON.parse(req.body.applicant)
 * 
 * - File paths perlu di-inject ke object yang bersangkutan
 *   Contoh: req.body.applicant.photo = '/uploads/xxx.jpg'
 * 
 * FIELD NAMES DARI FRONTEND:
 * --------------------------
 * Files:
 *   - applicantPhoto        → req.body.applicant.photo
 *   - applicantIdentityPhoto → req.body.applicant.identityPhoto
 *   - familyPhoto           → req.body.family.photo
 *   - familyIdentityPhoto   → req.body.family.identityPhoto
 *   - familyCard            → req.body.family.familyCard
 *   - incomePicture         → req.body.income.incomePicture
 * 
 * JSON Strings:
 *   - applicant  (semua field kecuali photo & identityPhoto)
 *   - family     (semua field kecuali photo, identityPhoto, familyCard)
 *   - product    (creditType, creditTerm, creditAmount, purpose)
 *   - income     (amount saja, incomePicture dari file)
 *   - outcome    (amount)
 */
export const injectCreditFiles = (req, res, next) => {
    const files = req.files || {};

    // =========================================================================
    // STEP 1: Parse JSON strings menjadi objects
    // =========================================================================
    // Saat menggunakan FormData, nested objects dikirim sebagai JSON string
    // Contoh: formData.append('applicant', JSON.stringify({name: 'John', ...}))
    // Di server diterima sebagai: req.body.applicant = '{"name":"John",...}'
    // Perlu di-parse menjadi object agar bisa diakses: req.body.applicant.name
    
    // Parse applicant
    if (typeof req.body.applicant === 'string') {
        try {
            req.body.applicant = JSON.parse(req.body.applicant);
        } catch {
            req.body.applicant = {};
        }
    }
    req.body.applicant = req.body.applicant || {};

    // Parse family
    if (typeof req.body.family === 'string') {
        try {
            req.body.family = JSON.parse(req.body.family);
        } catch {
            req.body.family = {};
        }
    }
    req.body.family = req.body.family || {};

    // Parse income
    if (typeof req.body.income === 'string') {
        try {
            req.body.income = JSON.parse(req.body.income);
        } catch {
            req.body.income = {};
        }
    }
    req.body.income = req.body.income || {};

    // Parse product
    if (typeof req.body.product === 'string') {
        try {
            req.body.product = JSON.parse(req.body.product);
        } catch {
            req.body.product = {};
        }
    }
    req.body.product = req.body.product || {};

    // Parse outcome
    if (typeof req.body.outcome === 'string') {
        try {
            req.body.outcome = JSON.parse(req.body.outcome);
        } catch {
            req.body.outcome = {};
        }
    }
    req.body.outcome = req.body.outcome || {};

    // =========================================================================
    // STEP 2: Inject file paths ke req.body
    // =========================================================================
    // Setelah Multer upload files, informasi file ada di req.files
    // Contoh: req.files.applicantPhoto[0].filename = '1703312345-uuid.jpg'
    // Kita inject path-nya ke req.body agar Zod bisa validasi
    
    // Inject applicant photos
    if (files.applicantPhoto?.[0]) {
        req.body.applicant.photo = `/uploads/${files.applicantPhoto[0].filename}`;
    }
    if (files.applicantIdentityPhoto?.[0]) {
        req.body.applicant.identityPhoto = `/uploads/${files.applicantIdentityPhoto[0].filename}`;
    }

    // Inject family photos
    if (files.familyPhoto?.[0]) {
        req.body.family.photo = `/uploads/${files.familyPhoto[0].filename}`;
    }
    if (files.familyIdentityPhoto?.[0]) {
        req.body.family.identityPhoto = `/uploads/${files.familyIdentityPhoto[0].filename}`;
    }
    if (files.familyCard?.[0]) {
        req.body.family.familyCard = `/uploads/${files.familyCard[0].filename}`;
    }

    // Inject income picture
    if (files.incomePicture?.[0]) {
        req.body.income.incomePicture = `/uploads/${files.incomePicture[0].filename}`;
    }

    // =========================================================================
    // STEP 3: Lanjut ke middleware berikutnya (Zod validation)
    // =========================================================================
    // Sekarang req.body sudah dalam format yang benar:
    // {
    //   applicant: { name: 'John', photo: '/uploads/xxx.jpg', ... },
    //   family: { name: 'Jane', photo: '/uploads/yyy.jpg', ... },
    //   ...
    // }
    // Zod validation bisa berjalan dengan normal
    
    next();
};
