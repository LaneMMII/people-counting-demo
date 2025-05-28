import { Context } from 'koa';
import { 
    createDeviceService,
    getAllDevicesService,
    getDeviceByIdService,
    updateDeviceService,
    deleteDeviceService,
 } from './device.service';

 import { deviceCreateSchema, deviceUpdateSchema } from './device.schema';

export const createDeviceController = async (ctx: Context) => {
  try {
    const parseResult = deviceCreateSchema.safeParse((ctx.request as any).body);
    if (!parseResult.success) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format', details: parseResult.error.errors };
      return;
    }
    const device = await createDeviceService(parseResult.data);
    ctx.status = 201;
    ctx.body = { message: 'Device created successfully', device };
  } catch (err) {
    console.error('Create device controller error:', err);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const getAllDevicesController = async (ctx: Context) => {
      try {
    const devices = await getAllDevicesService();
    ctx.body = { devices };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const getDeviceByIdController = async (ctx: Context) => {
  try {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid device ID' };
      return;
    }
    const device = await getDeviceByIdService(id);
    if (!device) {
      ctx.status = 404;
      ctx.body = { error: 'Device not found' };
      return;
    }
    ctx.body = { device };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const updateDeviceController = async (ctx: Context) => {
  try {
    const id = Number(ctx.params.id);
    const parseResult = deviceUpdateSchema.safeParse((ctx.request as any).body);
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid device ID' };
      return;
    }
    if (!parseResult.success) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format', details: parseResult.error.errors };
      return;
    }
    const device = await updateDeviceService(id, parseResult.data);
    if (!device) {
      ctx.status = 404;
      ctx.body = { error: 'Device not found' };
      return;
    }
    ctx.body = { message: 'Device updated successfully', device };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const deleteDeviceController = async (ctx: Context) => {
  try {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid device ID' };
      return;
    }
    const deleted = await deleteDeviceService(id);
    if (!deleted) {
      ctx.status = 404;
      ctx.body = { error: 'Device not found' };
      return;
    }
    ctx.body = { message: 'Device deleted successfully' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};