import Router from 'koa-router';

import {
  getAllSampleController,
  getSampleByIdController,
} from './count.controller';

export const router = new Router({
  prefix: '/count',
});
router.get('/', getAllSampleController);
router.get('/:id', getSampleByIdController);
