import {z} from "zod";


const gallerySchema = z.object({
    title: z.string().min(3, "Judul wajib diisi"),
    content: z.string().min(3, "Isi wajib diisi"),
    image: z.string().min(3, "Gambar wajib diisi").optional(),
});

export const createGallerySchema = gallerySchema;
export const updateGallerySchema = gallerySchema.partial();
