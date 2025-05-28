import { Context } from 'koa';
import {
  createLocationService,
  getAllLocationsService,
  getLocationByIdService,
  updateLocationService,
  deleteLocationService,
} from './location.service';

export const createLocationController = async (ctx: Context) => {
  try {
    const { name, address } = (ctx.request as any).body;
    if (typeof name !== 'string' || typeof address !== 'string') {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format' };
      return;
    }
    const location = await createLocationService({ name, address });
    ctx.status = 201;
    ctx.body = { message: 'Location created successfully', location };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const getAllLocationsController = async (ctx: Context) => {
  try {
    const locations = await getAllLocationsService();
    ctx.body = { locations };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const getLocationByIdController = async (ctx: Context) => {
  try {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid location ID' };
      return;
    }
    const location = await getLocationByIdService(id);
    if (!location) {
      ctx.status = 404;
      ctx.body = { error: 'Location not found' };
      return;
    }
    ctx.body = { location };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const updateLocationController = async (ctx: Context) => {
  try {
    const id = Number(ctx.params.id);
    const { name } = (ctx.request as any).body;
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid location ID' };
      return;
    }
    const location = await updateLocationService(id, { name });
    if (!location) {
      ctx.status = 404;
      ctx.body = { error: 'Location not found' };
      return;
    }
    ctx.body = { message: 'Location updated successfully', location };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const deleteLocationController = async (ctx: Context) => {
  try {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid location ID' };
      return;
    }
    const deleted = await deleteLocationService(id);
    if (!deleted) {
      ctx.status = 404;
      ctx.body = { error: 'Location not found' };
      return;
    }
    ctx.body = { message: 'Location deleted successfully' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};