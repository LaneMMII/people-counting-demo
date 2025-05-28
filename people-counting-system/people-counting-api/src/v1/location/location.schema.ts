import { z } from 'zod';

export const locationCreateSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
});

export const locationUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});