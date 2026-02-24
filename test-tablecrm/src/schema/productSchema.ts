import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  type: z
    .enum(['product', 'service', 'offer', 'resource', 'rent', 'realty', 'work'])
    .default('product'),
  description_short: z.string().optional(),
  description_long: z.string().optional(),
  tags: z.string().optional(),
  code: z.string().optional(),
  unit: z.number().positive().optional(),
  category: z.number().positive().optional(),
  manufacturer: z.string().optional(),
  cashback_type: z.enum(['lcard_cashback', 'none']).default('lcard_cashback'),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.array(z.string()).optional(),
  global_category_id: z.number().positive().optional(),
  marketplace_price: z.number().positive().optional(),
  chatting_percent: z.number().min(4).max(100).optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type ProductFormValues = z.output<typeof productSchema>;
