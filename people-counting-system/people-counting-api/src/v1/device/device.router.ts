import Router from 'koa-router';

// import controllers here
import { createDeviceController } from './device.controller';

export const router = new Router({
  prefix: '/device',
});

router.post('/', createDeviceController)
