// Wrong before: content tidak divalidasi. (Before: hanya title, image).
import { z } from "zod";

const servicesSchema = z.object({
    title: z.string().min(3, "Judul wajib diisi"),
    content: z.string().min(3, "Konten wajib diisi"),
    image: z.string().min(3, "Gambar wajib diisi").optional(),
});

export const createServicesSchema = servicesSchema;
export const updateServicesSchema = servicesSchema.partial();
