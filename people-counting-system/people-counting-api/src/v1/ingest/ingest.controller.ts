import { Context } from 'koa';
import { ingestSensorDataService } from './ingest.service';
import { ingestSchema } from './ingest.schema';

export const ingestSensorDataController = async (ctx: Context) => {
  try {
    const validation = ingestSchema.safeParse(ctx.request.body);
    if (!validation.success) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format', details: validation.error.errors };
      return;
    }

    await ingestSensorDataService(validation.data);

    ctx.status = 200;
    ctx.body = { message: 'Sensor data ingested successfully' };
  } catch (err) {
    console.error('Ingest controller error:', err);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
