import { z } from 'zod';
import { api } from './api';

export const RegisterSchema = z.object({
  idNumber: z.string(),
  idType: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;

export const authService = {

  register: async (data: RegisterRequest): Promise<void> => {
    const validated = RegisterSchema.parse(data);
    await api.post('/api/auth/register', validated);
  },

  login: async (data: LoginRequest): Promise<{ accessToken: string }> => {
    const validated = LoginSchema.parse(data);
    const response = await api.post('/api/auth/login', validated);
    return response.data; // { accessToken: string }
  }

};