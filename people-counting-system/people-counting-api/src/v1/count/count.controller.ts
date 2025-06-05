import z from 'zod';
import {
  getAggregatedCountByDevice,
  getAggregatedCountByLocation,
} from './count.service';

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
    ctx.body = {
      error: parseResult.error.errors.map((e) => e.message).join(', '),
    };
    return;
  }

  const { deviceId, locationId, start, end, aggregate } = parseResult.data;
  const agg = aggregate || 'minute';

  try {
    let result;
    if (deviceId !== undefined) {
      result = await getAggregatedCountByDevice(
        deviceId,
        start!,
        end || new Date().toISOString(),
        agg,
      );
    } else if (locationId !== undefined) {
      result = await getAggregatedCountByLocation(
        locationId,
        start!,
        end || new Date().toISOString(),
        agg,
      );
    } else {
      ctx.status = 400;
      ctx.body = { error: 'Either deviceId or locationId must be provided' };
      return;
    }

    ctx.body = result;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
