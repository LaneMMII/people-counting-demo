import { z } from 'zod';

export const ingestSchema = z.object({
  sensorId: z.number().int(),
  name: z.string().min(1),
  timestamp: z.string().datetime(),
  in: z.number().int(),
  out: z.number().int(),
});