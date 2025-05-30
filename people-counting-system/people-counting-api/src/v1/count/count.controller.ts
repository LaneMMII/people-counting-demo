import { Context } from 'koa';
import { getAggregatedCountService } from './count.service';

const AGGREGATES = [
  'minute',
  'hour',
  'day',
  'week'
]

export const getAggregatedCountController = async (ctx: Context) => {
  const { deviceId, locationId, start, end, aggregate } = ctx.query;

  if ((deviceId && locationId) || (!deviceId && !locationId)) {
    ctx.status = 400;
    ctx.body = { error: 'Please provide either deviceId or locationId, but not both.' };
    return;
  }

  if (!start || isNaN(Date.parse(start as string))) {
    ctx.status = 400;
    ctx.body = { error: 'Start is required and must be a valid ISO date string.' };
    return;
  }

  if (end && isNaN(Date.parse(end as string))) {
    ctx.status = 400;
    ctx.body = { error: 'End must be a valid ISO date string.' };
    return;
  }

  if (end && new Date(start as string) > new Date(end as string)) {
    ctx.status = 400;
    ctx.body = { error: 'Start date must be before end date.' };
    return;
  }

  const agg = (aggregate as string) || 'minute';
  if (!AGGREGATES.includes(agg)) {
    ctx.status = 400;
    ctx.body = { error: `Invalid aggregate value. Allowed values are: ${AGGREGATES.join(', ')}` };
    return;
  }

  try {
    const result = await getAggregatedCountService({
      deviceId: deviceId ? Number(deviceId) : undefined,
      locationId: locationId ? Number(locationId) : undefined,
      start: start as string,
      end: (end as string) || new Date().toISOString(),
      aggregate: agg,
    });
    
  ctx.body = result;

  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

