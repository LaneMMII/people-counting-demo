import { Context } from 'koa';

import { 
    createDevice,
    getAllDevices,
    getDeviceById,
    updateDevice,
    deleteDevice,
 } from './device.service';

import { deviceCreateSchema, deviceUpdateSchema } from './device.schema';

export const createDeviceController = async (ctx: Context) => {
  try {
    const validation = deviceCreateSchema.safeParse(ctx.request.body);

    if (!validation.success) {
      ctx.status = 400;
      ctx.body = {
        error: 'Invalid payload format',
        details: validation.error.errors,
      };
      return;
    }
    const { name, locationId, active } = validation.data;
    const device = await createDevice(name, locationId, active);

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
    const devices = await getAllDevices();
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
    const device = await getDeviceById(id);
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

    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid device ID' };
      return;
    }

    const validation = deviceUpdateSchema.safeParse(ctx.request.body);

    if (!validation.success) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format', details: validation.error.errors };
      return;
    }

    const { name, locationId, active } = validation.data;
    const device = await updateDevice(id, name, locationId, active);

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
    const deleted = await deleteDevice(id);
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