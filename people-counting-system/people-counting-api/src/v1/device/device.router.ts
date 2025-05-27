import Router from 'koa-router';
// import controllers here
import {
  createDeviceController,
  getAllDevicesController,
  getDeviceByIdController,
  updateDeviceController,
  deleteDeviceController,
} from './device.controller';

export const router = new Router({
  prefix: '/device',
});

router.post('/', createDeviceController)
      .get('/', getAllDevicesController)
      .get('/:id', getDeviceByIdController)
      .put('/:id', updateDeviceController)
      .delete('/:id', deleteDeviceController);
