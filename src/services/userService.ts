import { z } from "zod";
import { api } from "./api";

// Esquema para el rol
export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

// Esquema para el usuario
export const UserSchema = z.object({
  id: z.number(),
  idNumber: z.string(),
  idType: z.string(),
  name: z.string(),
  role: RoleSchema,
  phoneNumber: z.string(),
  email: z.string().email(),
  active: z.boolean(),
});

export type Role = z.infer<typeof RoleSchema>;
export type User = z.infer<typeof UserSchema>;

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get("/api/users");
    // Validación con Zod
    return z.array(UserSchema).parse(response.data);
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/api/users/${id}`);
    return UserSchema.parse(response.data);
  },

  create: async (userData: Omit<User, "id" | "role"> & { password: string }): Promise<User> => {
    const validatedData = z
      .object({
        idNumber: z.string(),
        idType: z.string(),
        name: z.string(),
        phoneNumber: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
      .parse(userData);

    const response = await api.post("/api/users", validatedData);
    return UserSchema.parse(response.data);
  },

  update: async (id: number, updateData: Partial<Omit<User, "id" | "role">>): Promise<User> => {
    const response = await api.put(`/api/users/${id}`, updateData);
    return UserSchema.parse(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  },
};
