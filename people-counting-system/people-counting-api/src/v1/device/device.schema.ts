import { z } from 'zod';

export const deviceCreateSchema = z.object({
  name: z.string().min(1),
  locationId: z.number().int(),
  active: z.boolean()
});

export const deviceUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  locationId: z.number().int().optional(),
  active: z.boolean()
});