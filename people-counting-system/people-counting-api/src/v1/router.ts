import Router from 'koa-router';

import { router as countRouter } from './count/count.router';
import { router as deviceRouter } from './device/device.router';
import { router as ingestRouter } from './ingest/ingest.router';
import { router as locationRouter } from './location/location.router';

export const router = new Router({
  prefix: '/v1',
});
router.use(countRouter.routes()).use(countRouter.allowedMethods());
router.use(deviceRouter.routes()).use(deviceRouter.allowedMethods());
router.use(ingestRouter.routes()).use(ingestRouter.allowedMethods());
router.use(locationRouter.routes()).use(locationRouter.allowedMethods());
