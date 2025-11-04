import { api } from './api';
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  brand: z.string(),
  description: z.string()
});

export const PaymentProductSchema = z.object({
  product: ProductSchema,
  quantity: z.number().nonnegative(),
  pricePerUnit: z.number().positive()
});

export const PaymentSchema = z.object({
  paymentId: z.number(),
  paymentDate: z.string(),
  amount: z.number(),
  products: z.array(PaymentProductSchema),
  notes: z.string().optional()
});

export const CreatePaymentSchema = z.object({
  supplierId: z.number(),
  paymentDate: z.string(),
  products: z.array(PaymentProductSchema),
  notes: z.string().optional()
});

export type Payment = z.infer<typeof PaymentSchema>;
export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

export const paymentService = {
  create: async (payment: CreatePayment): Promise<Payment> => {
    const validated = CreatePaymentSchema.parse(payment);
    const response = await api.post('/api/payments', validated);
    return response.data;
  },

  getBySupplierId: async (supplierId: number): Promise<{ supplierId: number; payments: Payment[] }> => {
    const response = await api.get(`/api/payments/supplier/${supplierId}`);
    return response.data;
  },

  getLastAndNextPaymentBySupplier: async (supplierId: number): Promise<{
    supplierId: number;
    next: Payment | null;
    last: Payment | null;
  }> => {
    const response = await api.get(`/api/payments/supplier/${supplierId}/last-and-next`);
    return response.data;
  },

  getPaymentConditions: async (): Promise<{
    paymentConditions: { id: number; name: string; description: string }[];
  }> => {
    const response = await api.get('/api/payments/conditions');
    return response.data;
  },
};
