// Wrong before: facebook/instagram diwajibkan dan nama field salah (photo), jadi payload normal ditolak.
import { z } from "zod";

const teamProfileSchema = z.object({
    name: z.string().min(3, "Nama tim wajib diisi"),
    position: z.string().min(3, "Posisi wajib diisi"),
    image: z.string().min(3, "Gambar wajib diisi"),
    facebook: z.string().url("Facebook harus berupa URL").optional(),
    instagram: z.string().url("Instagram harus berupa URL").optional(),
});

export const createTeamProfileSchema = teamProfileSchema;
export const updateTeamProfileSchema = teamProfileSchema.partial();
