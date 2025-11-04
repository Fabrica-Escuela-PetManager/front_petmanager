import { api } from './api';
import { z } from 'zod';

export const ProviderSchema = z.object({
  id: z.number(),
  nit: z.string(),
  name: z.string().trim().min(1).max(100),
  phoneNumber: z.string().trim().min(1).max(20),
  address: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  paymentCondition: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable().optional(),
  }),
  paymentNotes: z.string().nullable().optional(),
});

export const CreateProviderSchema = z.object({
  nit: z.string(),
  name: z.string().trim().min(1).max(100),
  phoneNumber: z.string().trim().min(1).max(20),
  address: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  paymentConditionId: z.number(),
  paymentNotes: z.string().nullable().optional(),
});

export type Provider = z.infer<typeof ProviderSchema>;
export type CreateProvider = z.infer<typeof CreateProviderSchema>;

export const providerService = {
  getAll: async (): Promise<Provider[]> => {
    const response = await api.get('/api/suppliers');
    return response.data;
  },

  getById: async (id: number): Promise<Provider> => {
    const response = await api.get(`/api/suppliers/${id}`);
    return response.data;
  },

  create: async (provider: CreateProvider): Promise<Provider> => {
    const validated = CreateProviderSchema.parse(provider);
    const response = await api.post('/api/suppliers', validated);
    return response.data;
  },

  update: async (id: number, provider: Partial<CreateProvider>): Promise<Provider> => {
    const response = await api.put(`/api/suppliers/${id}`, provider);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/suppliers/${id}`);
  },

  checkNitExists: async (nit: string): Promise<boolean> => {
    const response = await api.get(`/api/suppliers/exists/nit/${nit}`);
    return response.data;
  }
};
