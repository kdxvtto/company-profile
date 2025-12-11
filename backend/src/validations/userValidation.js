import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(3, "Nama wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 8 karakter"),
});

export const createUserSchema = userSchema;
export const updateUserSchema = userSchema.partial();