import { Context } from 'koa';
import { ingestSensorDataService } from './ingest.service';

export const ingestSensorDataController = async (ctx: Context) => {
  try {
    const {
      sensorId,
      name,
      timestamp,
      in: inCount,
      out: outCount,
    } = (ctx.request as any).body;

    if (
      typeof sensorId !== 'number' ||
      typeof name !== 'string' ||
      typeof timestamp !== 'string' ||
      typeof inCount !== 'number' ||
      typeof outCount !== 'number'
    ) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format' };
      return;
    }

    await ingestSensorDataService({
      sensorId,
      name,
      timestamp,
      in: inCount,
      out: outCount,
    });

    ctx.status = 200;
    ctx.body = { message: 'Sensor data ingested successfully' };
  } catch (err) {
    console.error('Ingest controller error:', err);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
