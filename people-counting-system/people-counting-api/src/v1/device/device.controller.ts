import { Context } from 'koa';
import { createDeviceService } from './device.service';

export const createDeviceController = async (ctx: Context) => {
  try {
    const { name, locationId } = (ctx.request as any).body;

    if (typeof name !== 'string' || typeof locationId !== 'number') {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format' };
      return;
    }

    const device = await createDeviceService({ name, locationId });

    ctx.status = 201;
    ctx.body = { message: 'Device created successfully', device };
  } catch (err) {
    console.error('Create device controller error:', err);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};