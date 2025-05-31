import z from 'zod';
import { getAggregatedCount } from './count.service';

const AGGREGATES = ['minute', 'hour', 'day', 'week'] as const;

export const countQuerySchema = z.object({
  deviceId: z.coerce.number().optional(),
  locationId: z.coerce.number().optional(),
  start: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "'start' must be a valid ISO date string",
    }),
  end: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "'end' must be a valid ISO date string",
    }),
  aggregate: z.enum(AGGREGATES).optional(),
});

export const getAggregatedCountController = async (ctx: any) => {
  const parseResult = countQuerySchema.safeParse(ctx.query);

  if (!parseResult.success) {
    ctx.status = 400;
    ctx.body = { error: parseResult.error.errors.map(e => e.message).join(', ') };
    return;
  }

  const { deviceId, locationId, start, end, aggregate } = parseResult.data;

  if ((deviceId && locationId) || (!deviceId && !locationId)) {
    ctx.status = 400;
    ctx.body = { error: 'Please provide either deviceId or locationId, but not both.' };
    return;
  }

  if (start && end && new Date(start) > new Date(end)) {
    ctx.status = 400;
    ctx.body = { error: 'Start date must be before end date.' };
    return;
  }

  const agg = aggregate || 'minute';
  if (!AGGREGATES.includes(agg)) {
    ctx.status = 400;
    ctx.body = { error: `Invalid aggregate value. Allowed values are: ${AGGREGATES.join(', ')}` };
    return;
  }

  try {
    const result = await getAggregatedCount(
      deviceId,
      locationId,
      start || new Date(0).toISOString(),
      end || new Date().toISOString(),
      agg
    );

    ctx.body = result;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
