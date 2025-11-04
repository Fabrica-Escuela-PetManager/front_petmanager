import { api } from './api';
import { z } from 'zod';

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional()
});

export const CreateRoleSchema = z.object({
  name: z.string().trim().min(1).max(50),
  description: z.string().trim().max(255).optional()
});

export type Role = z.infer<typeof RoleSchema>;
export type CreateRole = z.infer<typeof CreateRoleSchema>;

export const roleService = {
  getAll: async (): Promise<Role[]> => {
    const response = await api.get('/api/users/roles');
    return response.data;
  },

  getById: async (id: number): Promise<Role> => {
    const response = await api.get(`/api/users/roles/${id}`);
    return response.data;
  },

  create: async (role: CreateRole): Promise<Role> => {
    const validated = CreateRoleSchema.parse(role);
    const response = await api.post('/api/users/roles', validated);
    return response.data;
  },

  update: async (id: number, role: Partial<CreateRole>): Promise<Role> => {
    const response = await api.put(`/api/users/roles/${id}`, role);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/users/roles/${id}`);
  },
};
