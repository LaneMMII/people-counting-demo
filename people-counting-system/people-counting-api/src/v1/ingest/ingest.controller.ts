import { Context } from 'koa';
import { ingestSensorDataService } from './ingest.service';
import { ingestSchema } from './ingest.schema';

export const ingestSensorDataController = async (ctx: Context) => {
  try {
    const parseResult = ingestSchema.safeParse((ctx.request as any).body);
    if (!parseResult.success) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format', details: parseResult.error.errors };
      return;
    }

    await ingestSensorDataService(parseResult.data);

    ctx.status = 200;
    ctx.body = { message: 'Sensor data ingested successfully' };
  } catch (err) {
    console.error('Ingest controller error:', err);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
