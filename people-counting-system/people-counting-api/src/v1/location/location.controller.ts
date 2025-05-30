import { Context } from 'koa';

import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from './location.service';

import { locationCreateSchema, locationUpdateSchema } from './location.schema';

export const createLocationController = async (ctx: Context) => {  
  const validation = locationCreateSchema.safeParse(ctx.request.body);  

  try {  
    if (!validation.success) {  
      ctx.status = 400;  
      ctx.body = {  
        error: 'Invalid payload format',  
        details: validation.error.errors,  
      };  
      return;  
    }  
    const { name, address } = validation.data;  
    const location = await createLocation(name, address);  

    ctx.status = 201;  
    ctx.body = { message: 'Location created successfully', location };  
  } catch (err) {  
    ctx.status = 500;  
    ctx.body = { error: 'Internal server error' };  
  }  
};  

export const getAllLocationsController = async (ctx: Context) => {
  try {
    const locations = await getAllLocations();
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
    const location = await getLocationById(id);  

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

    if (isNaN(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid location ID' };
      return;
    }

    const validation = locationUpdateSchema.safeParse(ctx.request.body);

    if (!validation.success) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid payload format', details: validation.error.errors };
      return;
    }

    const { name, address } = validation.data;
    const location = await updateLocation(id, name ?? '', address ?? '');

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

    const deleted = await deleteLocation(id);  

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