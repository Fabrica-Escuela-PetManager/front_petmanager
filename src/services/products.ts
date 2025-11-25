import { api } from './api';
import { z } from 'zod';

/* ============================
   Schemas de respuesta (Zod)
   ============================ */

// Producto básico
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  description: z.string()
});

// Respuesta POST supplier-product
export const SupplierProductResponseSchema = z.object({
  id: z.number(),
  supplier: z.object({
    id: z.number(),
    nit: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    email: z.string(),
    paymentCondition: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string()
    }),
    paymentNotes: z.string()
  }),
  product: ProductSchema
});

// Respuesta GET /api/products/supplier/{id}
export const SupplierProductsSchema = z.object({
  supplierId: z.number(),
  supplierName: z.string(),
  supplierProducts: z.array(
    z.object({
      supplierProductId: z.number(),
      product: ProductSchema
    })
  )
});

// Tipos inferidos
export type Product = z.infer<typeof ProductSchema>;
export type SupplierProductResponse = z.infer<typeof SupplierProductResponseSchema>;
export type SupplierProducts = z.infer<typeof SupplierProductsSchema>;

/* ============================
        Service
   ============================ */

export const productService = {

  // POST: crear relación proveedor-producto
  createSupplierProduct: async (
    supplierId: number,
    productId: number
  ): Promise<SupplierProductResponse> => {

    const response = await api.post(
      `/api/products/supplier-product?supplierId=${supplierId}&productId=${productId}`
    );

    return SupplierProductResponseSchema.parse(response.data);
  },

  // GET: obtener todos los productos
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get('/api/products');
    return ProductSchema.array().parse(response.data);
  },

  // GET: obtener productos por proveedor
  getSupplierProducts: async (supplierId: number): Promise<SupplierProducts> => {
    const response = await api.get(`/api/products/supplier/${supplierId}`);
    return SupplierProductsSchema.parse(response.data);
  },

  // DELETE: eliminar relación proveedor-producto
  deleteSupplierProduct: async (supplierProductId: number): Promise<void> => {
    await api.delete(`/api/products/supplier-product/${supplierProductId}`);
  }
};
